import { ADD_CONVERSION, LOAD_CONVERSIONS, DELETE_CONVERSION } from '../constants';

const CONVERSIONS = [
  // {
  //   from: {
  //       currencyName: 'rub',
  //       currencySymbol: 'r',
  //       id: 'rubl',
  //   },
  //   to: {
  //       currencyName: 'usd',
  //       currencySymbol: 'vf',
  //       id: 'usdd',
  //   },
  //   price: 100
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