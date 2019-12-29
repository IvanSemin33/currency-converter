//////////////////////////////////////
///   List of currencies Reducer   ///
//////////////////////////////////////

import { SET_LIST_OF_CURRENCIES } from '../constants';

// Initial state
const LIST_OF_CURRENCIES = {};

const listOfCurrencies = (state = LIST_OF_CURRENCIES, { list, type }) => {
    switch (type) {
        case SET_LIST_OF_CURRENCIES : 
            return list;
        default:
            return state;
  }
}

export default listOfCurrencies;