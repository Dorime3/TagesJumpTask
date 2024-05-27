export interface ICatalogStoreState {
  items: Array<IItem>;
  materials: Array<IMaterial>;
  sortBy: string;
  filterBy: string;
  cartItemsIds: Array<string>;
  favoriteItemsIds: Array<string>;
}

export interface IRootState {
  catalogStore: ICatalogStoreState;
}

export interface IItem {
  id: string;
  name: string;
  code: string | null;
  price: {
    old_price: number | null;
    current_price: number | null;
  };
  image: string;
  material: number;
}

export interface IMaterial {
  id: string;
  name: string;
}

export interface IFormattedMaterial {
  label: string;
  value: string;
}
