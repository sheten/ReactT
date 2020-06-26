import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import styled from "styled-components";

// STYLED-COMPONENTS STYLE
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 88%;
`;
const Input = styled.input`
  background: #fffafa;
  border: 2px solid #1c6ea4;
  border-bottom: none;
  flex: 1;
  height: 6.5vh;
  width: 10%;

  ::hover {
    background-color: #1c6ea4;
  }
  ::placeholder {
    color: #1c6ea4;
    font-size: 2.5vh;
    text-align: center;
  }
  ::placeholdertextcolor: "red";
`;
const FormButton = styled.button`
  background: #1c6ea4;
  border: 2px inset black;
  color: antiquewhite;
  cursor: pointer;
  font-size: 2.5vh;
  height: 6.5vh;
`;

class InputFirebase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Q1: null,
      Q2: null,
      Q3: null,
      Q4: null,
      Q5: null,
      Q6: null,
    };
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var today = new Date();

    this.props.firebase.firestore
      .collection("diq4y7jHCiZHTisAIN8s53GaUjm1")
      .add({
        CreationDate: today,
        Atsakymai: this.state,
      })
      .then(() => {
        alert("Siandienos Ivertinimas Uzfiksuotas!");
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div style={{ display: "flex" }}>
          <Input
            required
            placeholder="1"
            type="text"
            id="Q1"
            atsakymas="11"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="2"
            type="text"
            id="Q2"
            atsakymas="11"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="3"
            type="text"
            id="Q3"
            atsakymas="11"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="4"
            type="text"
            id="Q4"
            atsakymas="11"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="5"
            type="text"
            id="Q5"
            atsakymas="11"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="6"
            type="text"
            id="Q6"
            atsakymas="11"
            onChange={this.onValueChange}
          />
        </div>
        <FormButton>Pateikti Atsakymus</FormButton>
      </Form>
    );
  }
}

export default withFirebase(InputFirebase);
