import React from 'react';
import Featured from './featured/Featured';
import MatchesHome from './matches/MatchesHome';
import MeetPlayers from './meetPlayers/MeetPlayers';

const Home = () => {
    return (
        <div className='bck_blue'>
            <Featured />
            <MatchesHome />
            <MeetPlayers />
        </div>
    );
};

export default Home;