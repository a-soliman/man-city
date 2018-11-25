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
        playedFilter: 'All',
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
    };

    showPlayed = (filter) => {
        let filterdMatches;
        if ( filter === 'All') filterdMatches = this.state.matches;
        else filterdMatches = this.state.matches.filter(match => {
            return match.final === filter
        });

        this.setState({
            filterdMatches,
            playedFilter: filter,
            resultFilter: 'All'
        });
    };

    showResult = (filter) => {
        let filterdMatches;
        if ( filter === 'All' ) filterdMatches = this.state.matches;
        else filterdMatches = this.state.matches.filter( match => {
            return match.final === 'Yes' && match.result === filter;
        });

        this.setState({
            filterdMatches,
            playedFilter: 'All',
            resultFilter: filter
        });
    };

    render() {
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            
                            <div className="match_filters_box">
                                <div className="tag">
                                    Show Match
                                </div>
                                <div className="cont">
                                    <div 
                                        className={`option ${state.playedFilter === 'All' ? 'active': ''}`} 
                                        onClick={() => this.showPlayed('All')}>
                                        All
                                    </div>
                                    <div 
                                        className={`option ${state.playedFilter === 'Yes' ? 'active': ''}`}
                                        onClick={() => this.showPlayed('Yes')}>
                                        Played
                                    </div>
                                    <div 
                                        className={`option ${state.playedFilter === 'No' ? 'active': ''}`} 
                                        onClick={() => this.showPlayed('No')}>
                                        Not Played
                                    </div>
                                </div>
                            </div>

                            <div className="match_filters_box">
                                <div className="tag">
                                    Result game
                                </div>
                                <div className="cont">
                                    <div 
                                        className={`option ${state.resultFilter === 'All' ? 'active': ''}`} 
                                        onClick={() => this.showResult('All')}>
                                        All
                                    </div>
                                    <div 
                                        className={`option ${state.resultFilter === 'W' ? 'active': ''}`}
                                        onClick={() => this.showResult('W')}>
                                        W
                                    </div>
                                    <div 
                                        className={`option ${state.resultFilter === 'L' ? 'active': ''}`} 
                                        onClick={() => this.showResult('L')}>
                                        L
                                    </div>

                                    <div 
                                        className={`option ${state.resultFilter === 'D' ? 'active': ''}`} 
                                        onClick={() => this.showResult('D')}>
                                        D
                                    </div>
                                </div>
                            </div>

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