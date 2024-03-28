import requests from "./httpServices";

const CategoryServices = {
  getShowingCategory: async () => {
    return requests.get("/category/show");
  },
  getShowingCatalogCategory: async () => {
    return requests.get(`/category/show/catalog`);
  },
  getShowingCategoryBySlug: async ({ slug = "" }) => {
    return requests.get(`/category/slug/catalog?slug=${slug}`);
  },
};

export default CategoryServices;
