import io from 'socket.io-client';

const url: string = 'http://161.200.199.2:5002';

const socket = io(url);
// const socket = openSocket(url);

export default socket;