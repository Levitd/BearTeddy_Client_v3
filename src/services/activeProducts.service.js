import httpService from "./http.service";

const activeProductsEndpoint = "product/";

const ActiveProductsService = {
    getProductsById: async (_id) => {
        const { data } = await httpService.get(activeProductsEndpoint, {
            params: {
                orderBy: '"_id"',
                equalTo: `"${_id}"`
            }
        });
        return data;
    },
};

export default ActiveProductsService;
