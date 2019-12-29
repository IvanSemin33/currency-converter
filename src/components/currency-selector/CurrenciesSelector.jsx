//////////////////////////////////////
/// Currencies Selectors Component ///
//////////////////////////////////////

import React, { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import store from '../../redux/store';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { addConversion } from '../../redux/actions/action-conversions';
import './currenciesSelector.css';


class CurrenciesSelector extends Component {

    state = {
        valueFrom: '', // from currency
        valueTo: '', // to currency
    }

    // From selector handler 
    handleChangeFrom = event => {
        this.setState({valueFrom: event.target.value})
    };

    // To selector handler 
    handleChangeTo = event => {
        this.setState({valueTo: event.target.value})
    };

    // Convert button handler
    onClickConvert = () => {
        const {valueFrom, valueTo} = this.state;
        // Get From & To Object of currencies from currenciesList
        const { currenciesList, conversionsList } = this.props;
        const from = currenciesList[valueFrom];
        const to = currenciesList[valueTo];
        // Ckeck: Is this conversion already added?
        const isAdded = conversionsList.filter( conversion => 
            conversion.from.id === from.id && 
            conversion.to.id === to.id
            ).length !== 0;
        // If this conversion is not in the table
        // add it to the table
        if(!isAdded) {
            store.dispatch(addConversion(
                {
                    from: {
                        currencyName: from.currencyName,
                        currencySymbol: from.currencySymbol,
                        id: from.id,
                    },
                    to: {
                        currencyName: to.currencyName,
                        currencySymbol: to.currencySymbol,
                        id: to.id,
                    }
                }
            ))
        }
    }
    
    // Render Currencies Selectors
    render() {
        const { currenciesList } = this.props;
        const {valueFrom, valueTo} = this.state;
        
        return(
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                {/* From Selector */}
                <Grid item>
                    <FormControl className="form-control">
                        <InputLabel id="select-label-from">
                            From:
                        </InputLabel>
                        <Select
                            id="select-from"
                            value={valueFrom}
                            onChange={this.handleChangeFrom}
                        >
                            {Object.values(currenciesList)
                                .map( currency => {
                                    const { id, currencyName, currencySymbol } = currency;
                                    let currencyFullName = `${id} - ${currencyName}`;
                                    // If currencySymbol exist
                                    // add it to currencyFullName
                                    if(currencySymbol !== undefined) {
                                        currencyFullName = currencyFullName.concat(` - ${currencySymbol}`);
                                    } 
                                    return (
                                        <MenuItem key={id} value={id}>
                                            {currencyFullName}
                                        </MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                {/* To Selector */}
                <Grid item>
                    <FormControl className="form-control">
                        <InputLabel id="select-label-to">
                            To:
                        </InputLabel>
                        <Select
                            id="select-to"
                            value={valueTo}
                            onChange={this.handleChangeTo}
                        >
                            {Object.values(currenciesList)
                                .map( currency => {
                                    const { id, currencyName, currencySymbol } = currency;
                                    let currencyFullName = `${id} - ${currencyName}`;
                                    // If currencySymbol exist
                                    // add it to currencyFullName
                                    if(currencySymbol !== undefined) {
                                        currencyFullName = currencyFullName.concat(` - ${currencySymbol}`);
                                    } 
                                    return (
                                        <MenuItem key={id} value={id}>
                                            {currencyFullName}
                                        </MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                {/* Convert Button */}
                <Grid item>
                    {   // If From & To currencies are selected
                        // make convert button clickable
                        valueFrom === '' || valueTo === '' ? 
                            <Button variant="contained" disabled>
                                Convert<CachedIcon fontSize="large"/>
                            </Button> :
                            <Button variant="contained" color="primary" onClick={this.onClickConvert}>
                                Convert<CachedIcon fontSize="large"/>
                            </Button>
                    }      
                </Grid>
            </Grid>
        )
    }
}

export default CurrenciesSelector;
