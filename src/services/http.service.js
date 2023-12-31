import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import authService from "./auth.service";
import localStorageService, {
    getLoadingRefreshToken,
    removeAuthData,
    setLoadingRefreshToken
} from "./localStorage.service";

const http = axios.create({
    baseURL: (configFile.isFireBase ? configFile.apiEndPointFirebase : configFile.apiEndPointMongoDB)
});

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now();
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            if (isExpired) {
                const data = await authService.refresh();
                localStorageService.setTokens({
                    refreshToken: data.refresh_token, idToken: data.id_token, expiresIn: data.expires_in, localId: data.user_id
                });

            }
            const accesToken = localStorageService.getAccessToken();
            if (accesToken) {
                    config.params = {...config.params, auth: accesToken};
            }
        } else if (configFile.isMongoDB) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) ;
            const setState = getLoadingRefreshToken();

            if (refreshToken && refreshToken==='undefined'){
                removeAuthData();
            }
            if (isExpired && !setState) {
                setLoadingRefreshToken(true);

                const data = await authService.refresh();
                // localStorageService.setTokens({
                //     refreshToken: data.refreshToken, idToken: data.idToken, expiresIn: data.expiresIn, localId: data.localId
                // });
                localStorageService.setTokens(data);
                setLoadingRefreshToken(false);

            }
            const accesToken = localStorageService.getAccessToken();
            if (accesToken) {
                    config.headers = {...config.headers, Authorization: "Bearer " + accesToken};
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);
function transformData(data) {
    return (
        data && !data._id
            ? Object.keys(data).map(key => (
                {
                    ...data[key]
                }
            ))
            : data
    );
}
http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase || configFile.isMongoDB) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Unexpected Error. Something was wrong. Try it later");
        };
        return Promise.reject(error);
    });

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
};
export default httpService;
