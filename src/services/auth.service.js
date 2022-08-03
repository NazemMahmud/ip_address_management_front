import { guestInstance as axios } from "../utility/axios";


export const registration = data => {
    return axios.post('/register', data);
};
