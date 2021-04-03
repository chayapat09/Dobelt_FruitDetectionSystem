import React, { useState, useEffect } from 'react';
import socket from '../SocketIo/SocketIoInstance';
import EachState from '../Reuse/EachState';

function RobotState() {

  const [robotState, setRobotState] = useState(0);

  useEffect(()=>{
    console.log('run useEffect!')
    socket.on( 'connection', ({ val }: { val: number }) => {
      console.log(val);
      setRobotState(val);
    });
  }, []);

  return (
    <div>
        <h3 style={{ marginLeft: 20 }} >All robot states are shown here!</h3>
        <EachState name='Fruit Detection System'
                   value={robotState} />
    </div>
  );
}

export default RobotState;
