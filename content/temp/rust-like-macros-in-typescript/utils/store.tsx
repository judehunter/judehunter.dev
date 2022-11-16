export const create = <STATE, ACTIONS>(
  initialState: STATE,
  actions: (
    set: (
      state: // either pass a partial state:
      | Partial<STATE>
        // or a setState-like callback for derived values:
        | ((current: STATE) => Partial<STATE>),
    ) => void,
  ) => ACTIONS,
) => {
  // initialize the state with the user-defined defaults
  let state = initialState;

  type Subscriber = (state: STATE) => void;

  // we can remove the selector code here
  // and move it to the implementation of useSelector.
  const subscribers: Subscriber[] = [];

  const subscribe = (subscriber: Subscriber) => {
    subscribers.push(subscriber);

    // instead of an unsubscribe method,
    // we use the common pattern of returning
    // a cleanup function,
    // which is the unsubscribe method
    return () => subscribers.splice(subscribers.indexOf(subscriber), 1);
  };

  // we don't expose (return) this function
  // directly anymore
  // instead, we will expose the user-defined
  // actions only
  const notify = (newState: STATE) => {
    for (const subscriber of subscribers) {
      // again, we don't care about selectors here
      subscriber(newState);
    }

    state = newState;
  };

  // pass the setState function to the actions.
  // basically your usual React setState,
  // with the addition of merging the state,
  // like in Zustand
  const actualActions = actions((setStateAction) => {
    const newVal =
      typeof setStateAction === 'function'
        ? setStateAction(state)
        : setStateAction;

    notify({...state, ...newVal});
  });

  return {state, subscribe, ...actualActions};
};
