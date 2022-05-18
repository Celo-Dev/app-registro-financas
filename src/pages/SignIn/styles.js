import styled from "styled-components/native";

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 25px;
`;

export const InputArea = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "rgba(255,255,255,0.20)",
})`
  background-color: #000;
  width: 80%;
  font-size: 17px;
  color: #FFF;
  margin-bottom: 15px;
  padding: 10px;
  border-color: darkgreen;
  border-width: 1px;
  border-radius: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #00b94a;
width: 80%;
height: 45px;
border-radius: 8px;
margin-top: 10px;
`;

export const SubmitText = styled.Text`
font-size: 18px;
color: #131313;
`;

export const Link = styled.TouchableOpacity`
margin-top: 15px;
margin-bottom: 10px;
`;

export const LinkText = styled.Text`
color: #CCC;
`;

