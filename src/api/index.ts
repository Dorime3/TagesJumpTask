const basePath = process.env.NODE_ENV === "production" ? "/TagesJumpTask" : "";
export default {
  getItems() {
    return fetch(`${basePath}/mocks/items.json`).then((res) => {
      if (!res.ok) {
        throw new Error(`catalog items ${res.statusText}`);
      }
      return res.json();
    });
  },
  getMaterials() {
    return fetch(`${basePath}/mocks/materials.json`).then((res) => {
      if (!res.ok) {
        throw new Error(`material items ${res.statusText}`);
      }
      return res.json();
    });
  },
};
