import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { CityLogo } from './ui/icons'; 
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <AppBar
    position='fixed'
    style={{
      background: '#98c5e9',
      boxShadow: 'none',
      padding: '10px 0',
      borderBottom: '2px solid #00285e'
    }}
  >
    <Toolbar style={{
      display:'flex'
    }}>
      <div style={{ flexGrow: 1 }}>
        <div className='header_logo'>
          <CityLogo link={true} linkTo='/' width='70px' height='70px' />
        </div>
      </div>

      <Link to='/the_team'>
        <Button color='inherit'>The Team</Button>
      </Link>

      <Link to='/the_matches'>
      <Button color='inherit'>The Matches</Button>
      </Link>
    </Toolbar>
  </AppBar>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
