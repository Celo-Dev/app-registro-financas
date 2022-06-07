import React, { useState, createContext, useEffect } from "react";
import { login, logOut } from "../services/login";
import { alterarSaldo, register } from "../services/users";
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
      const userAuth = await login(email, password);
      setDataUser(userAuth);
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
      const userAuth = await register(nome, email, password)
      await alterarSaldo(nome, 0, userAuth.uid)
      setDataUser(userAuth)

    } catch (error) {
      alert(error.code);
      setLoading(false);
    }
  }


  async function storageUser(data) {
    await AsyncStorage.setItem("Auth_user", JSON.stringify(data));
  }

  //Sair do App
  async function signOut() {
    await logOut();
    
    await AsyncStorage.clear()
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signIn, signOut, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
