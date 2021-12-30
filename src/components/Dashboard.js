import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Table,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Schedule from "./Schedule";
import Overview from "./Overview";
import Navigation from "./Navigation";
import Leaderboard from "./Leaderboard";

export const teamData = React.createContext();

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState([]);
  const [team, setTeam] = useState({ teamId: "", membersArr: [], rounds: [] });
  const [teamsObj, setTeams] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const userRef = doc(db, "users", currentUser.uid);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
    }
  }

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
      <Navigation user={currentUser} />
      <Container className="mt-5">
        <Row>
          <Col>
            {teamsObj && <Leaderboard data={teamsObj} />}
            <Overview data={team} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
                <Link
                  to="/update-profile"
                  className="btn btn-primary w-100 mt-3"
                >
                  Update Profile
                </Link>
                <Link to="/add" className="btn btn-primary w-100 mt-3">
                  Database
                </Link>
              </Card.Body>
            </Card>
            {teamsObj && <Schedule teamsObj={teamsObj} />}
          </Col>
        </Row>
      </Container>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
