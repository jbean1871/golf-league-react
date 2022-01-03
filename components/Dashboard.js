import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Overview from "./Overview";
import Leaderboard from "./Leaderboard";
import ScheduleTable from "./ScheduleTable";
import Navigation from "./Navigation";
export const teamData = React.createContext();

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState([]);
  const [team, setTeam] = useState({ teamId: "", membersArr: [], rounds: [] });
  const [teamsObj, setTeams] = useState();
  const [loading, setLoading] = useState(false);
  const userRef = doc(db, "users", currentUser.uid);

  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      const data = await getDoc(userRef);
      setUser(data.data());
      if (data.data()) {
        getTeamData(data.data().teamId);
      }
    };
    const getTeamData = (id) => {
      onSnapshot(doc(db, "teams", id), (doc) => {
        const teamData = doc.data();
        setTeam({
          teamId: id,
          membersArr: teamData.membersArr,
          rounds: teamData.rounds,
        });
        setLoading(false);
      });
    };
    getUsers();

    const getTeams = async () => {
      const teamsRef = await getDocs(collection(db, "teams"));
      const teamsObj = {};
      teamsRef.forEach((team) => {
        teamsObj[team.id] = team.data();
      });
      setTeams(teamsObj);
      setLoading(false);
    };
    getTeams();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col>
            {teamsObj && <Leaderboard data={teamsObj} />}
            <Overview />
            <ScheduleTable />
          </Col>
        </Row>
      </Container>
    </>
  );
}
