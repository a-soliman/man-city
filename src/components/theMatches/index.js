import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebaseMatches } from '../../firebase/firebase';
import { firebaseLooper } from '../ui/misc';

import MatchesList from './matchesList';
import LeagueTable from './table';

class theMatches extends Component {

    state = {
        loading: true,
        matches: [],
        filterdMatches: [],
        playerFilter: 'All',
        resultFilter: 'All'
    }

    componentDidMount = () => {
        firebaseMatches.once('value').then(snapshot => {
            const matches = firebaseLooper(snapshot).reverse();
            this.setState({ 
                loading: false, 
                matches,
                filterdMatches: matches
            });
        });
    }
    render() {
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            <div className=""></div>
                        </div>
                        <MatchesList matches={state.filterdMatches} />
                    </div>
                    <div className="right">
                        <LeagueTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default theMatches;