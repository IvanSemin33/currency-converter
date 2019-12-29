import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { isNull } from 'util';

import { addConversion, getListOfCurrencies, loadConversions } from '../../redux/actions/actionCreator';
import ConversionsList from '../../components/conversions-list/ConversionsList';
import CurrenciesSelector from '../../components/currency-selector/CurrenciesSelector';
import Header from '../../components/header/Header';

import Grid from '@material-ui/core/Grid';
import './currency.css';


class Currency extends Component {

  componentDidMount() {
    store.dispatch(getListOfCurrencies());
    const parcedJson = JSON.parse(localStorage.getItem("saved-currencies"));     
    if(!isNull(parcedJson)) {
      store.dispatch(loadConversions(parcedJson));
    }
  }

  componentDidUpdate() {
    const { conversions } = this.props;
    const json = JSON.stringify({ conversions });
    localStorage.setItem("saved-currencies",json);
  }

  render() {
    const { conversions, listOfCurrencies } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item className="grid-item">
          <Header />
        </Grid>
        <Grid item className="grid-item">
          <CurrenciesSelector currenciesList={listOfCurrencies} conversionsList={conversions}/>
        </Grid>
        <Grid item className="grid-item">
          <ConversionsList conversionsList={conversions} />
        </Grid>
      </Grid>
    );
  }
}

export default connect(state => ({
  conversions: state.conversions,
  listOfCurrencies: state.listOfCurrencies,
}), { addConversion, getListOfCurrencies, loadConversions })(Currency);