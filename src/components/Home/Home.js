import React from 'react';
import Featured from './featured/Featured';
import MatchesHome from './matches/MatchesHome';
import MeetPlayers from './meetPlayers/MeetPlayers';
import Promotion from './promotion/Promotion';

const Home = () => {
    return (
        <div className='bck_blue'>
            <Featured />
            <MatchesHome />
            <MeetPlayers />
            <Promotion />
        </div>
    );
};

export default Home;