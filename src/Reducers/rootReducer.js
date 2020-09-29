const initState = {
  questions: [],
  averages: [],
};

const rootReducer = (state = initState, action) => {
  if (action.type === "ADD_QUESTION") {
    // let newPostsList = state.posts.filter((post) => {
    //   return post.id !== action.id;
    // });

    return {
      questions: action.questions,
      averages: action.averages,
    };
  }
  return state;
};

export default rootReducer;
