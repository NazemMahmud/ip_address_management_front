import { authInstance as axios } from "../utility/axios";
import { setHttpParams } from "../utility/utils";

/**
 *
 * @param params => optional { pageOffset | page | orderBy | sortBy }
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAllLogs = async params => {
    params = setHttpParams(params);
    return axios.get(`audit-log?${params}`);
};
