import React, { Component } from 'react';
import { firebaseMatches } from '../../../firebase/firebase';
import { firebaseLooper } from '../../ui/misc';

class Blocks extends Component {
    _isMounted = false;
    state = {
        matches: []
    }

    getData = () => {
        return firebaseMatches.limitToLast(6).once('value')
            .then((snapshot) => {
                this.setState({
                    matches: firebaseLooper(snapshot).reverse()
                })
            });
    };

    componentDidMount = () => {
        console.log('mounting')
        this.getData()
    }

    componentWillUnmount() {
        console.log('unmounting');
    }

    render() {
        return (
            <div className="home_matches">
            something
            </div>
        );
    }
}

export default Blocks;
