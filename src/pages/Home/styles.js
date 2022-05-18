import styled from 'styled-components/native';


export const Background = styled.View`
flex:1;
background-color: #131313;
`;

export const Container = styled.View`
margin-left: 15px;
margin-bottom: 25px;
`;

export const Name = styled.Text`
font-size: 20px;
color: #FFF;
font-style: italic;
`;

export const Balance = styled.Text`
margin-top: 5px;
font-size: 30px;
color:#FFF;
font-weight: bold;
`; 

export const Title = styled.Text`
margin-left:15px;
color:#009b4a;
margin-bottom: 10px;
font-weight: bold;
font-size: 15px
`;

export const List = styled.FlatList.attrs({
    marginHorizontal: 15
})`
padding-top: 15px;
background-color:#FFF;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
margin-left: 9px;
margin-right: 9px;
`;
