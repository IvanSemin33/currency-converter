///////////////////////////////////////
///   Currency Container Component  ///
///////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNull } from 'util';

import Grid from '@material-ui/core/Grid';

import store from '../../redux/store';
import { addConversion, loadConversions } from '../../redux/actions/action-conversions';
import { getListOfCurrencies } from '../../redux/actions/action-list-of-currencies';
import ConversionsList from '../../components/conversions-list/ConversionsList';
import CurrenciesSelector from '../../components/currency-selector/CurrenciesSelector';
import Header from '../../components/header/Header';
import './currency.css';


class Currency extends Component {

  // On component did mount
  componentDidMount() {
    // Get list of currencies
    // for currencies selectors
    store.dispatch(getListOfCurrencies());
    // Get saved data from localStorage
    const parcedJson = JSON.parse(localStorage.getItem("saved-currencies"));
    // If localStorage is not empty
    // load conversions from localStorage
    if(!isNull(parcedJson)) {
      store.dispatch(loadConversions(parcedJson));
    }
  }

  // On component did update
  componentDidUpdate() {
    const { conversions } = this.props;
    const json = JSON.stringify({ conversions });
    // Save current table data to localStorage
    localStorage.setItem("saved-currencies",json);
  }

  // Render Currency Container
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
        <Grid item></Grid>
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

//Connect with Redux
export default connect(state => ({
  conversions: state.conversions,
  listOfCurrencies: state.listOfCurrencies,
}), { addConversion, getListOfCurrencies, loadConversions })(Currency);