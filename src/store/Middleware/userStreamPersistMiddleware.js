export const userStreamPersistMiddleware = store => next => action => {
  const result = next(action);
  if (
    action.type.startsWith('userStreamStateSlice/')
  ) {
    const state = store.getState().userStreamStateSlice.streams;
    localStorage.setItem('userStreamStates', JSON.stringify(state));
  }
  return result;
};
