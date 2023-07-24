import config from "../../config";
import { convertQueryParams } from "../global/global";
import axios from "./base";

const api_url = config.api_url;

export default UserResource = {
    getAllProducts: () => {
        return axios.get(api_url + "/products");
    },
    updateProfile: (params) => {
        return axios.post(`${api_url}/user/update-user-details`, params);
    },
    verifyEmail: (params) => {
        const queryString = convertQueryParams(params);
        return axios.get(`${api_url}/user/send-email-verification-notification?${queryString}`);
    },
};
