import firebase from '../config/firebaseConnection';
export const login = async (email, password) => {
    const value = await firebase.auth().signInWithEmailAndPassword(email, password);
    const uid = value.user.uid;

    const snap = await firebase.database().ref("users").child(uid).once("value");

    return {
        uid: uid,
        nome: snap.val().nome,
        email: value.user.email,
    }
}

//Sair do App
export const logOut = async function (){
    await firebase.auth().signOut();
}