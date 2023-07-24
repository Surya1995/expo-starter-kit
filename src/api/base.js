import axios from "axios";
import config from "../../config";

const HOST_URL = config.api_url;

let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
};

const instance = axios.create({
    baseURL: HOST_URL,
    headers,
});

instance.interceptors.request.use(
    async function (conf) {
        const userToken = "lolololololol"; //await AsyncStorage.getItem("token");
        let params = {};

        if (conf.params) {
            params = conf.params;
        }
        if (userToken) {
            conf.headers.Authorization = "Bearer " + userToken;
        }

        conf.params = params;

        return conf;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    async function (response) {
        return response;
    },
    function (error) {
        console.error(error);
        console.error(error.response);

        return Promise.reject(error);
    },
);

export default instance;
