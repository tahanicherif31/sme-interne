type Listener = (isLoading: boolean) => void;

let isLoading = false;
const listeners = new Set<Listener>();

function notify() {
  for (const l of listeners) {
    l(isLoading);
  }
}

const loader = {
  show() {
    isLoading = true;
    notify();
  },

  hide() {
    isLoading = false;
    notify();
  },

  subscribe(fn: Listener) {
    listeners.add(fn);
    fn(isLoading);
    return () => {
      listeners.delete(fn);
    };
  },
};

export default loader;
