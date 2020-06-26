import React, { Component } from "react";
import InputFirebase from "./InputFirebase";
import GlobalStyle from "../GlobalStyle";

import { withAuthorization } from "../Session";
import styled from "styled-components";

// STYLED-COMPONENTS
const Pas = styled.p`
  font-size: 3.5vh;
  font-weight: 400;

  @media only screen and (max-width: 800px) {
    font-size: 2.2vh;
    font-weight: 400;
  }
`;

const H2 = styled.h2`
  text-align: left;
  font-size: 4.3vh;
  font-weight: 600;
  width: 100%;

  @media only screen and (max-width: 800px) {
    font-size: 3vh;
  }
`;

class Landing extends Component {
  render() {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "7vh",
        }}
      >
        <GlobalStyle />
        <div
          style={{
            color: "#1c6ea4",
            marginBottom: "5vh",
            width: "88%",
          }}
        >
          <H2>Užpildykite šiandienos įvertinimą:</H2>
          <div style={{ height: "50vh", overflow: "auto" }}>
            <Pas>
              1. Ar viską padarei šiandien, nustatydamas konkrečius tikslus?
            </Pas>
            <Pas>
              2. Ar viską padarei šiandien, siekdamas konkrečių užsibrėžtų
              tikslų?
            </Pas>
            <Pas>3. Ar viską padarei šiandien, kad diena būtų prasminga?</Pas>
            <Pas>4. Ar viską padarei šiandien, kad būtum laimingas?</Pas>
            <Pas>
              5. Ar viską padarei šiandien, kad užaugintum pozityvius santykius
              su tave supančiais žmonėmis?
            </Pas>
            <Pas>
              6. Ar viską padarei šiandien, kad būtum pilnai įsitraukęs į savo
              veiklas?
            </Pas>
          </div>
        </div>

        <InputFirebase />
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Landing);
