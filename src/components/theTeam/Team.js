import React, { Component } from 'react';
import PlayerCard from '../ui/PlayerCard';
import Fade from 'react-reveal/Fade';
import { firebasePlayers, firebaseStorage } from '../../firebase/firebase';
import { firebaseLooper } from '../ui/misc';
import { Promise } from 'core-js';

class Team extends Component {

    state = {
        loadding: true,
        players: []
    };

    componentDidMount = () => {
        firebasePlayers.once('value').then(snapshot => {
            const players = firebaseLooper(snapshot);
            let promises = [];

            for ( let key in players ) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebaseStorage.ref('players')
                        .child(players[key].image).getDownloadURL()
                            .then( url => {
                                players[key].url = url;
                                resolve();
                            })
                    })
                )
            }

            Promise.all(promises).then(() => {
                this.setState({ loadding: false, players });
            })
        });
    }

    showPlayersByCategory = (category) => (
        this.state.players ?
            this.state.players.map((player, i) => {
                return player.position.toLowerCase() === category ?
                    <Fade left delay={i*20} key={i}>
                        <div className="item">
                            <PlayerCard 
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                bck={player.url}
                            />
                        </div>
                    </Fade>
                :null
            })
        : null
    );

    render() {
        return (
            <div 
                className="the_team_container" 
                style={{
                    background: `url(/images/stripes.png) repeat`
                }}
            >   
                { !this.state.loadding ?
                    <div>
                      <div className="team_category_wrapper">
                        <div className="title">Keepers</div>
                        <div className="team_cards">
                            {this.showPlayersByCategory('keeper')}
                        </div>
                      </div> 

                       <div className="team_category_wrapper">
                        <div className="title">Defence</div>
                        <div className="team_cards">
                            {this.showPlayersByCategory('defence')}
                        </div>
                      </div> 

                       <div className="team_category_wrapper">
                        <div className="title">Midfield</div>
                        <div className="team_cards">
                            {this.showPlayersByCategory('midfield')}
                        </div>
                      </div>

                       <div className="team_category_wrapper">
                        <div className="title">Strikers</div>
                        <div className="team_cards">
                            {this.showPlayersByCategory('striker')}
                        </div>
                      </div> 

                    </div>
                    : null
                }
            </div>
        );
    }
}

export default Team;