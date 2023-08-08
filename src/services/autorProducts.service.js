import httpService from "./http.service";

const autorProductsEndpoint = "product/";

const AutorProductsService = {
    getProductsByIdUser: async (_id) => {
        const { data } = await httpService.get(autorProductsEndpoint, {
            params: {
                orderBy: '"user_id"',
                equalTo: `"${_id}"`
            }
        });
        return data;
    },
};

export default AutorProductsService;
