import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { deleteConversion } from '../../redux/actions/actionCreator';
import store from '../../redux/store';
import './conversionsList.css';

class ConversionsList extends Component {
    
    onClickDelete = (from, to) => {
        store.dispatch(deleteConversion({ from, to }));
    }

    render() {
        const { conversionsList } = this.props;

        return(
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Grid item>
                    <Typography variant="h4">
                        History of conversions
                    </Typography>
                </Grid>
                <Grid item className="grid-item-table">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>From</b></TableCell>
                                    <TableCell><b>To</b></TableCell>
                                    <TableCell colSpan={2}><b>Price</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {conversionsList.length === 0 ?
                                <TableRow key='empty'>
                                    <TableCell colSpan={3} align="center">Empty</TableCell>
                                </TableRow>     
                                :
                                conversionsList.map(conversion => (
                                    <TableRow key={`${conversion.from.id}_${conversion.to.id}`}>
                                        <TableCell>{`${conversion.from.id} - ${conversion.from.currencyName}`}</TableCell>
                                        <TableCell>{`${conversion.to.id} - ${conversion.to.currencyName}`}</TableCell>
                                        <TableCell>{conversion.price}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => this.onClickDelete(conversion.from, conversion.to)}>
                                                <DeleteForeverIcon fontSize="default"/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>)
                                )
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>    
        )
    }
}

export default ConversionsList;