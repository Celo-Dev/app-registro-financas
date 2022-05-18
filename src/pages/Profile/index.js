import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, IconView, Name, NewLink, NewText, Logout, LogoutText } from './styles'
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Feather'

import { AuthContext } from '../../contexts/auth';

export default function Profile() {

    const { user, signOut } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <Container>
            <Header />
            <IconView>
                <Icon name='user' color='#FFF' size={70} />
            </IconView>
            <Name>
                {user && user.nome}
            </Name>
            <NewLink onPress={() => navigation.navigate("Registrar")} >
                <NewText>Registrar gastos</NewText>
            </NewLink>

            <Logout onPress={() => signOut()}>
                <LogoutText>Sair</LogoutText>
            </Logout>
        </Container>
    );
}