import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="container">
    <div className="signin_wrapper" style={{ margin: '100px' }}>

          <h2>Please Login</h2>
          <button className="button" onClick={startLogin}>Login with Google</button>
    </div>
  </div>
  
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
