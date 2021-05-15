import React, { useState, useEffect } from 'react';
import socket from '../SocketIo/SocketIoInstance';
import EachState from '../Reuse/EachState';
// import {IRobotState  , RobotState as RS}  from '../../../server/client-endpoints/src/topics/cloud-to-client/robotState/robotState.type'
function RobotState() {

  const [robotState, setRobotState] = useState(0);

  useEffect(()=>{
    console.log('run useEffect!')
    socket.on('robotState', (state :any) => {
      setRobotState(state.state);
      // setRobotState(val);
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
