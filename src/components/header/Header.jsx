import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import './header.css';

class Header extends Component {
    render() {
        return(
            <Typography variant="h2" className="head-text">
                Currency Converter
            </Typography>
        )
    }
}

export default Header;