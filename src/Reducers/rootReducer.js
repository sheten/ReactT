const initState = {
  items: [
    {
      id: "1",
      title: "Karalius",
      body: "Yra pavaldus zmonems, zmones jam pavaldus",
    },
    {
      id: "2",
      title: "Sargybinis",
      body: "Yra atsakingas uz save ir teritorijos sauguma",
    },
    {
      id: "3",
      title: "Zemdirbys",
      body: "Yra paprastas gyventojas, palaikantis karalystes gyvybinguma",
    },
  ],
};

const rootReducer = (state = initState, action) => {
  return state;
};

export default rootReducer;
