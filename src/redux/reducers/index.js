import { combineReducers } from 'redux';
import conversions from './conversions';
import listOfCurrencies from './list-of-currencies';

const rootReducer = combineReducers({ conversions, listOfCurrencies });

export default rootReducer;