import { guestInstance as axios, authInstance as authAxios } from "../utility/axios";


export const registration = data => {
    return axios.post('/register', data);
};

export const login = async data => {
    // REMINDER: no need to receive id, it will be in token
    return axios.post('/login', data);
};


export const logout = async () => {
    return authAxios.post('/logout');
};
