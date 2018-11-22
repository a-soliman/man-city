import React from 'react';
import Zoom from 'react-reveal/Zoom';


const Animation = () => {
    return (
        <div className="promotion_animation">
            <div className="left">
                <Zoom>
                    <span>Win a</span>
                    <span>Jersey</span>
                </Zoom>
            </div>
            <div className="right">
                <Zoom>
                    <div style={{ background: `url(/images/jersey.jpg) no-repeat`}}></div>
                </Zoom>
            </div>
        </div>
    );
};

export default Animation;