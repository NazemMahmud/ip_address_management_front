import { authInstance as axios } from "../utility/axios";
import { setHttpParams } from "../utility/utils";


/**
 *
 * @param params => optional { pageOffset | page | orderBy | sortBy }
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAllIp = async params => {
    params = setHttpParams(params);
    return axios.get(`ip?${params}`);
};

/** TODO: Get single data */
export const getSingleIp = async id => {
    return axios.get(`ip/${id}`);
};

/** TODO: Store new IP address */
export const storeIp = async data => {
    return axios.post('ip', data);
};

/** TODO: Update an IP address */
export const updateIp = async (data, id) => {
    return axios.patch(`ip/${id}`, data);
};
