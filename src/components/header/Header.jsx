//////////////////////////////////////
///         Header Component       ///
//////////////////////////////////////

import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import icon from './icon.png';
import './header.css';

class Header extends Component {
    
    // Render Header
    render() {
        return(
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid item>
                    <img src={icon} alt="icon" className="icon-img"/>
                </Grid>
                <Grid item>
                    <Typography variant="h2" className="head-text">
                        Currency Converter
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default Header;