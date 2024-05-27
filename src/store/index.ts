import { createStore, Store as VuexStore } from "vuex";
import { IRootState } from "./types";
import catalogStore from "./modules/catalogStore";

export const store = createStore<IRootState>({
  modules: {
    catalogStore,
  },
});

export function useStore(): VuexStore<IRootState> {
  return store as VuexStore<IRootState>;
}

export default store;
