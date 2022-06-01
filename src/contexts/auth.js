import React, { useState, createContext, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);


  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("Auth_user");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }

    loadStorage()
  }, [])

  function setDataUser(data) {
    setUser(data);
    storageUser(data);
    setLoadingAuth(false);
  }


  //Logar o Usuário
  async function signIn(email, password) {
    setLoadingAuth(true);

    try {

      const value = await firebase.auth().signInWithEmailAndPassword(email, password);
      const uid = value.user.uid;

      const snap = await firebase.database().ref("users").child(uid).once("value");
      setDataUser({
        uid: uid,
        nome: snap.val().nome,
        email: value.user.email,
      })

    }
    catch (error) {
      alert(error.code);
      setLoadingAuth(false);
    }
  }


  //Cadastrar o Usuário 
  async function signUp(nome, email, password) {
    setLoadingAuth(true);

    try {

      const value = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = value.user.uid;

      await firebase.database().ref("users").child(uid).set({
        saldo: 0,
        nome: nome
      })
      setDataUser({
        uid: uid,
        nome: nome,
        email: value.user.email
      })

    } catch (error) {
      alert(error.code);
      setLoading(false);
    }
  }

  async function storageUser(data) {
    await AsyncStorage.setItem("Auth_user", JSON.stringify(data));
  }

  async function signOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signIn, signOut, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
