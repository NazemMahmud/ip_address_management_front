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


/**
 * Get single data
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getSingleIp = async id => {
    return axios.get(`ip/${id}`);
};


/**
 * Store new IP address
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const storeIp = async data => {
    return axios.post('ip', data);
};


/**
 * Update an IP address
 * @param data
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateIp = async (data, id) => {
    return axios.patch(`ip/${id}`, data);
};
