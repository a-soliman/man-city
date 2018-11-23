import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { startLogout } from '../../actions/auth';

const Nav = () => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/edit_match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Player',
            linkTo: '/admin_players/edit_player'
        }
    ];

    const buttonStyle = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    };

    const renderItems = () => (
        links.map((link, i) => (
            <Link to={link.linkTo} key={i}>
                <ListItem button style={buttonStyle} >
                    {link.title}
                </ListItem>
            </Link>
        ))
    );

    return (
        <div>
            {renderItems()}
            <ListItem button style={buttonStyle} onClick={startLogout()}>Log out</ListItem>
        </div>
    );
};

export default Nav;