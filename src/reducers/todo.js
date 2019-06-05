function todoReducer(state = [], action) {
  console.log(`Performing action ${action.type}`);
  switch (action.type) {
    default:
      console.warn(`Do not know how to perform ${action.type} action`);
      return state;
  }
}

export default todoReducer;
