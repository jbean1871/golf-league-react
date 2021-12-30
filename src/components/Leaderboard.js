import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export default function Leaderboard() {
  async function orderTotals() {
    db.collection("teams")
      .orderBy("totalPoints", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
        });
      });
  }
  useEffect(() => {
    orderTotals();
  }, []);
  return (
    <div>
      <p></p>
    </div>
  );
}
