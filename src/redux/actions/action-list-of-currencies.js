//////////////////////////////////////
///   List of currencies Actions   ///
//////////////////////////////////////

import { SET_LIST_OF_CURRENCIES , API_KEY} from '../constants';

const axios = require('axios');

// Set list of currencies action
export const setListOfCurrencies = (list) => ({
    type: SET_LIST_OF_CURRENCIES,
    list
});

// Get list of currencies action
export const getListOfCurrencies = () => {
    return (dispatch) => {
        return axios
            .get('https://free.currconv.com/api/v7/currencies', {  
                params: {
                    apiKey: API_KEY,
                }
            })
            .then(res => { dispatch(setListOfCurrencies(res.data.results)) });
    }
};