import { ADD_CONVERSION, SET_LIST_OF_CURRENCIES, LOAD_CONVERSIONS, DELETE_CONVERSION , API_KEY} from '../constants';
const axios = require('axios');

//conventions
export const addConversion = ({ from, to }) => {
    return (dispatch) => {
        return axios
            .get('https://free.currconv.com/api/v7/convert', {  
                params: {
                    apiKey: API_KEY,
                    q: `${from.id}_${to.id}`,
                    compact: 'ultra',
                }
            })
            .then(res => { dispatch({
                    type: ADD_CONVERSION,
                    from,
                    to,
                    price: res.data[`${from.id}_${to.id}`],
                })}
            );
    }
}
export const deleteConversion = ({ from, to }) => {
    console.log(from);
    return ({
        type: DELETE_CONVERSION,
        from,
        to,
    });
}

export const loadConversions = ({conversions}) => ({
        type: LOAD_CONVERSIONS,
        conversions
    });



//list-of-currencies
export const setListOfCurrencies = (list) => ({
    type: SET_LIST_OF_CURRENCIES,
    list
});

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