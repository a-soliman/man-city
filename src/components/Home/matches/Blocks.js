import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import { firebaseMatches } from '../../../firebase/firebase';
import { firebaseLooper } from '../../ui/misc';
import MatchesBlock from '../../ui/matches_block';

class Blocks extends Component {
    state = {
        matches: []
    }

    getMatches = () => {
        return new Promise((resolve, reject) => {
            firebaseMatches.limitToLast(6).once('value')
                .then((snapshot) => {
                    resolve(firebaseLooper(snapshot));
                });
        })
    };

    showMatches = (matches) => (
        matches ? 
            matches.map((match) => (
                <Slide key={match.id} bottom>
                    <div className="item">
                        <div className="wrapper">
                            <MatchesBlock match={match} />
                        </div>
                    </div>
                </Slide>
                
            ))
        : null
    );

    componentWillMount = () => {
        this.getMatches().then(data => {
            this.setState({
                matches: data
            })
        })
    }


    render() {
        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        );
    }
}

export default Blocks;
