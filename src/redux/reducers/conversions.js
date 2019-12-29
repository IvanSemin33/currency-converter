//////////////////////////////////////
///       Conversions Reducer      ///
//////////////////////////////////////

import { ADD_CONVERSION, LOAD_CONVERSIONS, DELETE_CONVERSION } from '../constants';

// Initial state
const CONVERSIONS = [
  // {
  //   from: {
  //       currencyName: 'Рубль',
  //       currencySymbol: '₽',
  //       id: 'RUB',
  //   },
  //   to: {
  //       currencyName: 'USD',
  //       currencySymbol: '$',
  //       id: 'USD',
  //   },
  //   price: 63
  // } 
];

const conversions = (state = CONVERSIONS, { conversions, from, to, price, type }) => {
  switch (type) {
    case ADD_CONVERSION : {
      return [
          ...state, {
            from,
            to,
            price
          }
      ];
      
    }
    case DELETE_CONVERSION :
      return [...state.filter( conversion => 
          conversion.from.id !== from.id || 
          conversion.to.id !== to.id
        )
      ];
    case LOAD_CONVERSIONS :
      return conversions;
    default:
      return state;
  }
}

export default conversions;