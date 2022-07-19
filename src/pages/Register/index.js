import React, { useState, useContext } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Background, IconView, Input, SubmitButton, SubmitText } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';

import { useNavigation } from '@react-navigation/native';
import Picker from '../../components/Picker';

import { AuthContext } from '../../contexts/auth';
import { useDispatch } from 'react-redux';
import { setAmount } from '../../store/amount';
import { setHistorico } from '../../store/historico';
import { historico, buscaHistorico } from '../../services/historico';
import { atualizarSaldo } from '../../services/users';



export default function Register() {
  const navigation = useNavigation();

  const [valorRegistro, setValorRegistro] = useState('');
  const [tipo, setTipo] = useState('receita');
  
  const { user: usuario } = useContext(AuthContext);
  const dispatch = useDispatch()
  

  function goHome() {
    Keyboard.dismiss();
    setValorRegistro('');
    navigation.navigate('Home');

  }

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

  //Registrar historico
  async function handleAdd() {
    await historico(usuario, tipo, valorRegistro)
    const uid = usuario.uid;

    // //Atualizar Saldo
    const saldo = await atualizarSaldo(uid, tipo, valorRegistro)
    dispatch(setAmount(saldo));


    const historicoList = await buscaHistorico(uid);
    dispatch(setHistorico(historicoList))

    goHome()
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