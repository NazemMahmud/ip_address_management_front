import { guestInstance as axios, authInstance as authAxios } from "../utility/axios";


export const registration = data => {
    return axios.post('/register', data);
};

export const login = async data => {
    return axios.post('/login', data);
};


export const logout = async () => {
    return authAxios.post('/logout');
};
