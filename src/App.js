import React from "react";
import "./App.css";
import styled from "styled-components";
import encryption from "./lalala.js";
const COntentDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const DivStartStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
`;
const ButtonStyled = styled.button`
  height: 30px;
`;
const TextAreaDiv = styled(DivStartStyle)`
  justify-content: space-around;
  align-items: center;
`;
const UserControllDiv = styled(DivStartStyle)`
  flex-direction: column;
  padding: 0;
`;
const RValueDiv = styled(DivStartStyle)`
  justify-content: start;
  line-height: 5px;
`;
const ButtonConteiner = styled(DivStartStyle)``;
class App extends React.Component {
  state = {
    inputText: "",
    outputText: ""
  };
  encode = () => {
    const inputArea = document.getElementById("input");
    const rValueInput = document.getElementById("rValue");
    this.setState({ outputText: encryption.encrypt(inputArea.value, Number(rValueInput.value)) });
  };
  decode = () => {
    const inputArea = document.getElementById("input");
    const rValueInput = document.getElementById("rValue");
    this.setState({ outputText: encryption.decode(inputArea.value, Number(rValueInput.value)) });
  };
  textfromOutputToInput = () => {
    this.setState(cur => ({
      inputText: cur.outputText
    }));
  };
  typingText = event => {
    this.setState({ inputText: event.target.value });
  };
  render() {
    return (
      <COntentDiv>
        <div className="App">
          <TextAreaDiv>
            <textarea id="input" cols="30" rows="10" value={this.state.inputText} onChange={this.typingText} />
            <ButtonStyled children="<->" onClick={this.textfromOutputToInput} />
            <textarea id="output" cols="30" rows="10" readOnly value={this.state.outputText} />
          </TextAreaDiv>
          <UserControllDiv>
            <RValueDiv>
              <p>R =</p>
              <input id="rValue" type="text" placeholder="R value" pattern="[3]{1}\.{1,2}" />
            </RValueDiv>
            <ButtonConteiner>
              <ButtonStyled onClick={this.encode}>Encode</ButtonStyled>
              <ButtonStyled onClick={this.decode}>Decode</ButtonStyled>
            </ButtonConteiner>
          </UserControllDiv>
        </div>
      </COntentDiv>
    );
  }
}

export default App;
