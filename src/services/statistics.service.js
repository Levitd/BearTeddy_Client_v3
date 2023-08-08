import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const endPoint = "statistics/";

const StatisticsService = {
    get: async () => {
        const { data } = await httpService.get(endPoint);
        return data;
    },
    put: async (payload) => {
        const { data } = await httpService.put(endPoint + payload._id, payload);
        return data;
    }
};

export default StatisticsService;
