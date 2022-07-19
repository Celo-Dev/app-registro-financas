import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header'
import { Background, Container, Name, Balance, Title, List } from './styles';
import HistoricoList from '../../components/HistoricoList';

import { AuthContext } from '../../contexts/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setAmount } from '../../store/amount';
import { setHistorico } from '../../store/historico';

import { buscarSaldo } from '../../services/users';
import { buscaHistorico } from '../../services/historico';


export default function Home() {

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const amount = useSelector((state) => state.amount.value);
  const historico = useSelector((state) => state.historico.list);
  const dispatch = useDispatch();


  useEffect(() => {

    async function loadList() {
      const saldo = await buscarSaldo(uid);
      dispatch(setAmount(saldo));

      const historicoList = await buscaHistorico(uid);
      dispatch(setHistorico(historicoList))
      
    }

    loadList();

  }, [])

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.nome}</Name>

        <Balance>R$ {amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Balance>
      </Container>

      <Title>Ultimas Movimentações : </Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (<HistoricoList data={item} />)}
      />
    </Background>
  );
}