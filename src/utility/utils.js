/** Local storage related **/
export const getAccessToken = localStorage.getItem('accessToken') || '';

export const getUserData = () => {
    const userData = localStorage.getItem('userData') || '';
    return userData ? JSON.parse(userData) : {};
};


/**
 * Check submit button should remain disabled or not
 * @param formInput
 * @returns {boolean}
 */
export const checkDisableButton = formInput => {
    for (const property in formInput) {
        if (!formInput[property].isValid) {
            return true;
        }
    }
    return false;
};

// format data before submit
export const formatSubmitData = formInput => {
    const data = {};
    for (let item in formInput) {
        data[formInput[item].key] = formInput[item].value;
    }

    return data;
};
