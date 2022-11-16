import {createContext, useContext, useEffect, useState} from 'react';

export const createStore = <STATE, ACTIONS>(
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
      setStateAction instanceof Function
        ? setStateAction(state)
        : setStateAction;

    console.log({newVal});

    notify({...state, ...newVal});
  });

  return {state, subscribe, ...actualActions};
};

const useSelector = <STATE extends any>(
  store: {state: STATE; subscribe: any},
  selector: (state: STATE) => any,
) => {
  // we use the current state value to set the
  // initial value for our state
  const [selectedValue, setSelectedValue] = useState(selector(store.state));

  useEffect(() => {
    // if the return part is confusing to you,
    // double back to the previous code block
    // to see that calling the subscribe method
    // returns the unsubscribe method,
    // which lets us use this convenient pattern
    return store.subscribe((newState) => {
      // React will take care of handling
      // equality checks, making sure
      // this setState only triggers a re-render
      // when necessary
      console.log(newState);
      setSelectedValue(selector(newState));
    });
  }, []);

  return selectedValue;
};

const myStore = createStore(
  {
    a: 0,
    b: 0,
  },
  (set) => ({
    inca: () => set((x) => ({a: x.a + 1})),
    incb: () => set((x) => ({b: x.b + 1})),
  }),
);

const Child = ({k}: {k: 'a' | 'b'}) => {
  const val = useSelector(myStore, (x) => x[k]);
  console.log(k, 'rerender');
  return (
    <button onClick={() => myStore['inc' + k]((x) => x + 1)}>
      {k} {val}
    </button>
  );
};

const Parent = () => {
  console.log('parent rerender');

  return (
    <div>
      <Child k="a" />
      <Child k="b" />
    </div>
  );
};

export default Parent;
