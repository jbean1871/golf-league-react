import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();
  const [teamData, setTeamData] = useState();
  const [teamsData, setTeamsData] = useState();
  const [loading, setLoading] = useState(true);

  // Signed In User Oject
  async function user() {
    const userRef = doc(db, "users", currentUser.uid);
    const userData = await getDoc(userRef);
    setUserData(userData.data());
    team(userData.data().teamId);
  }
  async function team(team) {
    const teamRef = doc(db, "teams", team);
    const teamData = await getDoc(teamRef);
    setTeamData(teamData.data());
  }

  async function teams() {
    let teamsObj = {};
    const teamsCol = query(
      collection(db, "teams"),
      orderBy("totalPoints", "desc")
    );
    const teamsArr = await getDocs(teamsCol);
    teamsArr.forEach((team) => {
      teamsObj[team.id] = team.data();
    });
    setTeamsData(teamsObj);
    setLoading(false);
  }

  useEffect(() => {
    if (currentUser) {
      user();
      teams();
    }
  }, []);

  const value = {
    userData,
    setUserData,
    teamData,
    setTeamData,
    teamsData,
    setTeamsData,
    loading,
    setLoading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
