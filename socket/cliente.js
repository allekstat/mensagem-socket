// import { io as socket_io_client } from 'socket.io-client';
import { io as transmissor_cliente } from 'socket.io-client';
// const transmissor_cliente = require('socket.io-client');
// const socket_io_client = require('socket.io-cliente');
const servidor = 'http://localhost:1234';
const cliente_socket = transmissor_cliente(servidor,
{
    transports: ['websocket']
});
export default cliente_socket;