import firebase from '../config/firebaseConnection';

export async function register(nome, email, password) {
    const value = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const uid = value.user.uid;

    return {
        uid: uid,
        nome: nome,
        email: value.user.email
    }
}

export async function alterarSaldo(nome, saldo, uid) {
    await firebase.database().ref("users").child(uid).set({
        saldo,
        nome: nome
    })
}