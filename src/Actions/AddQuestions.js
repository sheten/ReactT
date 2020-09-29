export const AddQuestions = (questions, averages) => {
  return {
    type: "ADD_QUESTION",
    questions: questions,
    averages: averages,
  };
};
