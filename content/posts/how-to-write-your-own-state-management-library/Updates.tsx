import {createContext, useContext, useEffect, useState} from 'react';
import tw from 'twin.macro';
import {motion, useAnimation} from 'framer-motion';

const ContextExampleContext = createContext<any>(null!);

const ContextExampleFourth = () => {
  const controls = useAnimation();
  const controls2 = useAnimation();
  const justRerendered = useContext(ContextExampleContext).justRerendered;

  useEffect(() => {
    if (justRerendered) {
      controls.set({
        borderColor: 'rgb(127, 236, 157)',
      });
      controls.start({borderColor: 'rgb(46, 52, 64)'});
    }
  }, [justRerendered]);

  return (
    <motion.div
      tw="flex-grow border-2 rounded-[8px] border-[rgb(46, 52, 64)]"
      animate={controls}
      transition={{duration: 1}}
    >
      <motion.div
        tw="h-full rounded-[8px] p-4"
        animate={{backgroundColor: 'rgb(7,  12, 16)'}}
        whileHover={{backgroundColor: 'rgb(15, 20, 26)'}}
        transition={{duration: 0.1, ease: 'linear'}}
      >
        <div tw="justify-center h-full flex items-center">A</div>
      </motion.div>
    </motion.div>
  );
};

const ContextExampleThird = () => {
  const controls = useAnimation();
  const justRerendered = useContext(ContextExampleContext).justRerendered;

  useEffect(() => {
    if (justRerendered) {
      controls.set({
        borderColor: 'rgb(127, 236, 157)',
      });
      controls.start({borderColor: 'rgb(46, 52, 64)'});
    }
  }, [justRerendered]);

  return (
    <motion.div
      tw="flex-grow border-2 rounded-[8px] border-[rgb(46, 52, 64)]"
      animate={controls}
      transition={{duration: 1}}
    >
      <motion.div
        tw="h-full rounded-[8px] p-4"
        animate={{backgroundColor: 'rgb(7,  12, 16)'}}
        whileHover={{backgroundColor: 'rgb(15, 20, 26)'}}
        transition={{duration: 0.1, ease: 'linear'}}
      >
        <div tw="justify-center h-full flex items-center">C</div>
      </motion.div>
    </motion.div>
  );
};

const ContextExampleSecond = () => {
  const controls = useAnimation();
  const justRerendered = useContext(ContextExampleContext).justRerendered;

  useEffect(() => {
    if (justRerendered) {
      controls.set({
        borderColor: 'rgb(127, 236, 157)',
      });
      controls.start({borderColor: 'rgb(46, 52, 64)'});
    }
  }, [justRerendered]);

  return (
    <motion.div
      tw="flex-grow border-2 rounded-[8px] border-[rgb(46, 52, 64)]"
      animate={controls}
      transition={{duration: 1}}
      onMouseEnter={(e) => e.stopPropagation()}
    >
      <motion.div
        tw="h-full rounded-[8px] flex flex-col p-4"
        animate={{backgroundColor: 'rgb(7,  12, 16)'}}
        whileHover={{backgroundColor: 'rgb(15, 20, 26)'}}
        transition={{duration: 0.1, ease: 'linear'}}
      >
        <div tw="text-center mb-4">B</div>
        <div tw="flex flex-grow space-x-4">
          <ContextExampleThird />
          <ContextExampleFourth />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContextExampleFirst = () => {
  const [justRerendered, setJustRerendered] = useState(0);

  const controls = useAnimation();

  useEffect(() => {
    if (justRerendered) {
      controls.set({
        borderColor: 'rgb(127, 236, 157)',
      });
      controls.start({borderColor: 'rgb(46, 52, 64)'});
    }
  }, [justRerendered]);

  return (
    <div>
      <div tw="font-bold mb-2 text-center">
        <small tw="opacity-50">Vanilla React</small>
        <br />
        Context API
      </div>
      <motion.div
        tw="w-[270px] h-[270px] border-2 border-[rgb(46, 52, 64)] rounded-[8px] flex flex-col font-semibold cursor-pointer"
        animate={controls}
        transition={{duration: 1}}
        onMouseEnter={(e) => e.stopPropagation()}
        onClick={() => setJustRerendered((x) => x + 1)}
      >
        <motion.div
          tw="h-full rounded-[8px] flex flex-col p-4"
          animate={{backgroundColor: 'rgb(7,  12, 16)'}}
          whileHover={{backgroundColor: 'rgb(15, 20, 26)'}}
          transition={{duration: 0.1, ease: 'linear'}}
        >
          <div tw="text-center mb-4">A</div>
          <ContextExampleContext.Provider value={{justRerendered, setJustRerendered}}>
            <ContextExampleSecond />
          </ContextExampleContext.Provider>
        </motion.div>
      </motion.div>
    </div>
  );
};

const StoreExampleContext = createContext<any>(null!);

const StoreExampleFourth = () => {
  const controls = useAnimation();
  const {state, setState} = useContext(StoreExampleContext);

  useEffect(() => {
    if (state.A || state.B) {
      controls.set({
        borderColor: 'rgb(127, 236, 157)',
      });
      controls.start({borderColor: 'rgb(46, 52, 64)'});
    }
  }, [state.A, state.B]);

  return (
    <motion.div
      tw="flex-grow border-2 rounded-[8px] border-[rgb(46, 52, 64)]"
      animate={controls}
      transition={{duration: 1}}
      onClick={(e) => {
        e.stopPropagation();
        setState((x) => ({...x, A: x.A + 1}));
      }}
    >
      <motion.div
        tw="h-full rounded-[8px] p-4"
        animate={{backgroundColor: 'rgb(7,  12, 16)'}}
        whileHover={{backgroundColor: 'rgb(15, 20, 26)'}}
        transition={{duration: 0.1, ease: 'linear'}}
      >
        <div tw="justify-center h-full flex items-center">A</div>
      </motion.div>
    </motion.div>
  );
};

const StoreExampleThird = () => {
  const controls = useAnimation();
  const {state, setState} = useContext(StoreExampleContext);

  useEffect(() => {
    if (state.C || state.A || state.B) {
      controls.set({
        borderColor: 'rgb(127, 236, 157)',
      });
      controls.start({borderColor: 'rgb(46, 52, 64)'});
    }
  }, [state.C, state.A, state.B]);

  return (
    <motion.div
      tw="flex-grow border-2 rounded-[8px] border-[rgb(46, 52, 64)]"
      animate={controls}
      transition={{duration: 1}}
      onClick={(e) => {
        e.stopPropagation();
        setState((x) => ({...x, C: x.C + 1}));
      }}
    >
      <motion.div
        tw="h-full rounded-[8px] p-4"
        animate={{backgroundColor: 'rgb(7,  12, 16)'}}
        whileHover={{backgroundColor: 'rgb(15, 20, 26)'}}
        transition={{duration: 0.1, ease: 'linear'}}
      >
        <div tw="justify-center h-full flex items-center">C</div>
      </motion.div>
    </motion.div>
  );
};

const StoreExampleSecond = () => {
  const controls = useAnimation();
  const {state, setState} = useContext(StoreExampleContext);

  useEffect(() => {
    if (state.B || state.A) {
      controls.set({
        borderColor: 'rgb(127, 236, 157)',
      });
      controls.start({borderColor: 'rgb(46, 52, 64)'});
    }
  }, [state.B, state.A]);

  return (
    <motion.div
      tw="flex-grow border-2 rounded-[8px] border-[rgb(46, 52, 64)]"
      animate={controls}
      transition={{duration: 1}}
      onMouseEnter={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        setState((x) => ({...x, B: x.B + 1}));
      }}
    >
      <motion.div
        tw="h-full rounded-[8px] flex flex-col p-4"
        animate={{backgroundColor: 'rgb(7,  12, 16)'}}
        whileHover={{backgroundColor: 'rgb(15, 20, 26)'}}
        transition={{duration: 0.1, ease: 'linear'}}
      >
        <div tw="text-center mb-4">B</div>
        <div tw="flex flex-grow space-x-4">
          <StoreExampleThird />
          <StoreExampleFourth />
        </div>
      </motion.div>
    </motion.div>
  );
};

const StoreExampleFirst = () => {
  const [state, setState] = useState({A: 0, B: 0, C: 0});

  const controls = useAnimation();

  useEffect(() => {
    if (state.A) {
      controls.set({
        borderColor: 'rgb(127, 236, 157)',
      });
      controls.start({borderColor: 'rgb(46, 52, 64)'});
    }
  }, [state.A]);

  return (
    <div tw="mt-8 md:mt-0">
      <div tw="font-bold mb-2 text-center">
        <small tw="opacity-50">Redux, Zustand, etc.</small>
        <br />
        Stores
      </div>
      <motion.div
        tw="w-[270px] h-[270px] border-2 border-[rgb(46, 52, 64)] rounded-[8px] flex flex-col font-semibold cursor-pointer"
        animate={controls}
        transition={{duration: 1}}
        onMouseEnter={(e) => e.stopPropagation()}
        onClick={() => setState((x) => ({...x, A: x.A + 1}))}
      >
        <motion.div
          tw="h-full rounded-[8px] flex flex-col p-4"
          animate={{backgroundColor: 'rgb(7,  12, 16)'}}
          whileHover={{backgroundColor: 'rgb(15, 20, 26)'}}
          transition={{duration: 0.1, ease: 'linear'}}
        >
          <div tw="text-center mb-4">A</div>
          <StoreExampleContext.Provider value={{state, setState}}>
            <StoreExampleSecond />
          </StoreExampleContext.Provider>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default () => {
  return (
    <>
      <div tw="flex flex-col md:flex-row justify-center items-center md:justify-between py-10 select-none -webkit-tap-highlight-color[transparent]">
        <ContextExampleFirst />
        <StoreExampleFirst />
      </div>
    </>
  );
};
