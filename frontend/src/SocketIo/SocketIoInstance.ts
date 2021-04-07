import io from 'socket.io-client';

const url: string = '';

const socket = io(url);
// const socket = openSocket(url);

export default socket;