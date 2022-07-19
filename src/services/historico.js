import firebase from '../config/firebaseConnection';
import { format } from 'date-fns';

 export async function historico(usuario, tipo, valorRegistro){
    const uid = usuario.uid;

    const key = await firebase.database().ref('historico').child(uid).push().key;

    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valorRegistro),
      date: format(new Date(), 'dd/MM/yyyy')
    })
}

  export async function buscaHistorico (uid) {
    return await firebase.database().ref('historico')
    .child(uid)
    .orderByChild('date').equalTo(format(new Date, 'dd/MM/yyyy'))
    .limitToLast(10)
    .once('value');
 
  }