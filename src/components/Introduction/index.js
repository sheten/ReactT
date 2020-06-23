import React from "react";

import { withAuthorization } from "../Session";

const IntroductionPage = () => (
  <div class="wrapper">
    <div class="divas">
      <p id="title">KAIP VISKAS VYKS?</p>
      <p id="content">
        Norint gauti dovaną reiks įveikti kelias kliūtis.
        <br />
        Viskas ko tau reikia yra tušinukas, popierius, smegenys ir formulės.
        <br />
        Visos formulės bus duotos, tik reikės pačiam išsiaiškinti kuriai
        kliūčiai, kokios formulės reikia.
        <br />
        Turėsi tik 5 gyvybes, kiek bus kliūčių negaliu pasakyti, sužinosi
        eigoje.
        <br />
        Įveikus kiekvieną kliūti gausi po vieną raidytę, pasižymėk jas, tau
        prireiks jų gale kliūčių.
        <br />
        Klausimų praleidinėti NEGALIMA!
        <br />
        Galite bandyti, vistiek grįšite prie kliūties.
        <br />
        Linkiu sėkmės ir ištvermės.
      </p>
    </div>

    <div id="button">
      <input
        type="button"
        onclick="gyvybes(); location.href='http://127.0.0.1:5500/Quizz/1ne.html';"
        value="Pradeti Klausimyna &#8594"
      />
    </div>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(IntroductionPage);
