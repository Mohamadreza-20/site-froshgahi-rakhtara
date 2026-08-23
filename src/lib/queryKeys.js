export const queryKeys = {
  categories: { all: ["categories"] },
  products: {
    all: ["products"],
    catalog: ["products", "catalog"],
    list: (params = {}) => ["products", "list", params],
    detail: (id) => ["products", "detail", String(id)],
  },
  users: {
    all: ["users"],
  },
  comments: {
    all: ["comments"],
  },
  contactMessages: {
    all: ["contactMessages"],
    mine: (userId) => ["contactMessages", "mine", String(userId)],
  },
  contactInfo: ["contactInfo"],
  showcase: ["showcase"],
};
