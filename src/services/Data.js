import React from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export function createUser(id, email, firstName, teamName) {
  const formatTeamName = teamName.replace(/\s+/g, "-").toLowerCase();
  setDoc(doc(db, "users", id), {
    firstName: firstName,
    email: email,
    teamName: formatTeamName,
  });
  let rounds = [];
  for (let i = 0; i <= 16; i++) {
    rounds.push({ opponent: "", score: "" });
  }
  setDoc(doc(db, "teams", formatTeamName), {
    member1: firstName,
    rounds: rounds,
  });

  return true;
}
