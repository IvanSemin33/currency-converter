import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import store from '../../redux/store';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { addConversion } from '../../redux/actions/actionCreator';
import './currenciesSelector.css';


class CurrenciesSelector extends Component {

    state = {
        valueFrom: '',
        valueTo: '',
    }

    handleChangeFrom = event => {
        this.setState({valueFrom: event.target.value})
    };

    handleChangeTo = event => {
        this.setState({valueTo: event.target.value})
    };

    onClickConvert = () => {
        const {valueFrom, valueTo} = this.state;
        const { currenciesList, conversionsList } = this.props;
        const from = currenciesList[valueFrom];
        const to = currenciesList[valueTo];

        const isAdded = conversionsList.filter( conversion => 
            conversion.from.id === from.id && 
            conversion.to.id === to.id
            ).length !== 0;

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
                                    const currencyFullName = `${id} - ${currencyName} - ${currencySymbol}`;
                                    return (
                                        <MenuItem key={id} value={id}>
                                            {currencyFullName}
                                        </MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
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
                                    const currencyFullName = `${id} - ${currencyName} - ${currencySymbol}`;
                                    return (
                                        <MenuItem key={id} value={id}>
                                            {currencyFullName}
                                        </MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    {valueFrom === '' || valueTo === '' ? 
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
