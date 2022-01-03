import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUser, partnerCheck } from "../services/Data";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, firstName, team) {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      createUser(auth.currentUser.uid, email, firstName, team);
      partnerCheck(firstName, team, auth.currentUser.uid);
    });
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function displayName(username) {
    return currentUser.updateProfile({ displayName: username });
  }
  function members(members) {
    return currentUser.updateProfile({ players: members });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    displayName,
    members,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
