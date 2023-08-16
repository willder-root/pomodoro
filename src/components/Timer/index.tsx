import React from 'react';
import { secondToTimer } from '../../utils/secondsToTime';
interface Props{
    mainTime: number;
}

const Timer = (props: Props):JSX.Element =>{

    return(
      <div className="timer">
        {secondToTimer(props.mainTime)}
      </div>  
    );
};

export default Timer;