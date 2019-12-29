//////////////////////////////////////
///       Conversions Actions      ///
//////////////////////////////////////

import { ADD_CONVERSION, LOAD_CONVERSIONS, DELETE_CONVERSION , API_KEY} from '../constants';

const axios = require('axios');

// Add conversion action
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

// Delete conversion action
export const deleteConversion = ({ from, to }) => ({
    type: DELETE_CONVERSION,
    from,
    to,
});

// Load conversions action
export const loadConversions = ({conversions}) => ({
        type: LOAD_CONVERSIONS,
        conversions
    });
