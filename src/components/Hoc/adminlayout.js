import React from 'react';
import Nav from '../admin/Nav';

const adminLayout = (props) => {
    return (
        <div className="admin_container">
            <div className="admin_left_nav">
                <Nav />
            </div>
            <div className="admin_right">
                {props.children}
            </div>
        </div>
    );
};

export default adminLayout;