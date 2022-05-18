import React, { useState, useContext } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import Header from '../../components/Header';
import { Background, IconView, Input, SubmitButton, SubmitText } from './styles';
import Picker from '../../components/Picker';


export default function Register() {
  const navigation = useNavigation();

  const [valorRegistro, setValorRegistro] = useState('');
  const [tipo, setTipo] = useState('receita');
  const { user: usuario } = useContext(AuthContext);

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valorRegistro)) || tipo === null) {
      alert('Preencha todos os campos!');
      return;
    }

    Alert.alert(
      'Confirmar Dados',
      `Tipo: ${tipo} ${'\n'}Valor: ${parseFloat(valorRegistro)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )

  }

  async function handleAdd() {
    let uid = usuario.uid;

    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valorRegistro),
      date: format(new Date(), 'dd/MM/yyyy')
    })

    //Atualizar Saldo
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ? saldo -= parseFloat(valorRegistro) : saldo += parseFloat(valorRegistro);
      user.child('saldo').set(saldo);
    });

    Keyboard.dismiss();
    setValorRegistro('');
    navigation.navigate('Home');

  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />
        <IconView>
          <Icon
            name={tipo === 'receita' ? 'trending-up' : 'trending-down'}
            color={tipo === 'receita' ? '#009b4a' : '#C62c36'}
            size={70} />
        </IconView>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder='Valor desejado'
            keyboardType='numeric'
            returnKeyType='next'
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valorRegistro}
            onChangeText={(value) => setValorRegistro(value)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}