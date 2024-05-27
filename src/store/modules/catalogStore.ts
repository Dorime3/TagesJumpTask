import api from "../../api/index";
import { Module } from "vuex";
import type {
  ICatalogStoreState,
  IRootState,
  IMaterial,
  IFormattedMaterial,
  IItem,
} from "../../store/types";

const catalogStore: Module<ICatalogStoreState, IRootState> = {
  namespaced: true,
  state: {
    items: [],
    materials: [],
    sortBy: "",
    filterBy: "",
    cartItemsIds: [],
    favoriteItemsIds: [],
  },
  getters: {
    getFormattedMaterials(state): Array<IFormattedMaterial> {
      return state.materials.map(({ id, name }: IMaterial) => ({
        label: name,
        value: id,
      }));
    },
    sortedItems(state): Array<IItem> {
      const tempItems = [...state.items];

      if (state.sortBy === "price") {
        return tempItems.sort((prev, next) => {
          const prevPrice = prev.price.current_price;
          const nextPrice = next.price.current_price;
          if (prevPrice !== null && nextPrice !== null) {
            return prevPrice - nextPrice;
          } else {
            return 0;
          }
        });
      } else if (state.sortBy === "-price") {
        return tempItems.sort((prev, next) => {
          const prevPrice = prev.price.current_price;
          const nextPrice = next.price.current_price;

          if (prevPrice !== null && nextPrice !== null) {
            return nextPrice - prevPrice;
          } else {
            return 0;
          }
        });
      }

      return state.items;
    },
    sortedFilteredItems(state, getters): Array<IItem> {
      return !state.filterBy
        ? getters.sortedItems
        : getters.sortedItems.filter(
            (item: IItem) => item.material === Number(state.filterBy)
          );
    },
  },
  mutations: {
    ["SET_ITEM_LIST"](state, { list } = []) {
      state.items = [...list];
    },
    ["SET_MATERIAL_LIST"](state, { list } = []) {
      state.materials = [...list];
    },
    ["SET_SORT_BY"](state, val: string) {
      state.sortBy = val;
    },
    ["SET_FILTER_BY"](state, val: string) {
      state.filterBy = val;
    },
    ["SET_CART_ITEMS_IDS"](state, ids: Array<string>) {
      state.cartItemsIds = ids;
    },
    ["SET_FAVORITE_ITEMS_IDS"](state, ids: Array<string>) {
      state.favoriteItemsIds = ids;
    },
    ["TOGGLE_CART_ITEM"](state, { itemId }: { itemId: string }) {
      if (state.cartItemsIds.includes(itemId)) {
        state.cartItemsIds = state.cartItemsIds.filter(
          (id: string) => id !== itemId
        );
      } else {
        state.cartItemsIds = [...state.cartItemsIds, itemId];
      }
      localStorage.setItem("cartItemsIds", JSON.stringify(state.cartItemsIds));
    },
    ["TOGGLE_FAVORITE_ITEM"](state, { itemId }: { itemId: string }) {
      if (state.favoriteItemsIds.includes(itemId)) {
        state.favoriteItemsIds = state.favoriteItemsIds.filter(
          (id: string) => id !== itemId
        );
      } else {
        state.favoriteItemsIds = [...state.favoriteItemsIds, itemId];
      }
      localStorage.setItem(
        "favoriteItemsIds",
        JSON.stringify(state.favoriteItemsIds)
      );
    },
  },
  actions: {
    async init({ dispatch, commit }) {
      await Promise.all([dispatch("getItemList"), dispatch("getMaterialList")]);

      commit(
        "SET_CART_ITEMS_IDS",
        JSON.parse(localStorage.getItem("cartItemsIds") || "[]")
      );
      commit(
        "SET_FAVORITE_ITEMS_IDS",
        JSON.parse(localStorage.getItem("favoriteItemsIds") || "[]")
      );
    },

    async getMaterialList({ commit }) {
      commit({
        type: "SET_MATERIAL_LIST",
        list: await api.getMaterials(),
      });
    },

    async getItemList({ commit }) {
      commit({
        type: "SET_ITEM_LIST",
        list: await api.getItems(),
      });
    },

    toggleCartItem({ commit }, itemId: string) {
      commit({
        type: "TOGGLE_CART_ITEM",
        itemId,
      });
    },

    toggleFavoriteItem({ commit }, itemId: string) {
      commit({
        type: "TOGGLE_FAVORITE_ITEM",
        itemId,
      });
    },
  },
};

export default catalogStore;
