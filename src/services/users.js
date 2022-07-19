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

export async function buscarSaldo(uid) {
    const user = firebase.database().ref('users').child(uid);
    const value = await user.once('value');

    return parseFloat(value.val().saldo);
}

//atualizar saldo
export async function atualizarSaldo(uid, tipo, valorRegistro) {
    let saldo = await buscarSaldo(uid)
    tipo === 'despesa' ? saldo -= parseFloat(valorRegistro) : saldo += parseFloat(valorRegistro);

    const user = firebase.database().ref('users').child(uid);
    user.child('saldo').set(saldo);

    return saldo;
}