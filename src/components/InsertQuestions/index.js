import React, { Component } from "react";
import { withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";
import GlobalStyle from "../GlobalStyle";
import styled from "styled-components";

// STYLED-COMPONENTS STYLE
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 4vh auto;
  text-align: center;
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

class InsertQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Question: null,
      Number: 7,
    };
  }

  componentDidMount() {
    var uid = this.props.firebase.auth.currentUser.uid;

    var i = 6;
    var sum = null;

    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("Klausimai")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(() => {
          i++;
          sum = i + 1 + ". ";
        });

        this.setState({ Number: sum });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var today = JSON.stringify(new Date());
    var uid = this.props.firebase.auth.currentUser.uid;
    var kelintas = this.state.Number;

    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("Klausimai")
      .doc(kelintas)
      .set({
        Data: today,
        Klausimas: this.state.Question,
        Number: this.state.Number,
      })
      .then(() => {
        alert("Klausimas Pridetas!");
        this.props.history.push(ROUTES.HOME);
      });
  };

  onValueChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <GlobalStyle />
        <h1>Add a Question to the List</h1>
        <div style={{ display: "flex" }}>
          <Input
            required
            placeholder="Question content..."
            type="text"
            id="Question"
            onChange={this.onValueChange}
          />
        </div>
        <FormButton>Add Question</FormButton>
      </Form>
    );
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(InsertQuestions);
