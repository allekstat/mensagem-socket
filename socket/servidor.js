import { default as modulo_express } from 'express';
import { default as modulo_http } from 'http';
import { Server as servidor_socket } from 'socket.io';
/// módulos do node
// const modulo_express = require('express');
// const modulo_http = require('http');
// const {Server: servidor_socket} = require('socket.io');
/// variáveis
const aplicacao = modulo_express();
const servidor = modulo_http.createServer(aplicacao);
const transmissor = new servidor_socket(servidor);
/// definição de mensagens de conexão
transmissor.on('connection', function (soquete)
{
    // console.log('um cliente se conectou');
    // console.log(soquete);
    soquete.on('entrar_sala', function (sala)
    {
        soquete.join(sala);
        // console.log(`cliente entrou no canal: ${sala}`);
    });
    soquete.on('envio_mensagem', function ({sala, mensagem, usuario})
    {
        console.log(`${usuario} mandou a mensagem ${mensagem} na sala ${sala}`)
        transmissor.to(sala).emit('recebimento_mensagem', {sala, mensagem, usuario});
        // console.log('alguém mandou mensagem');
    });
    soquete.on('disconnect', function ()
    {
        console.log('um cliente se desconectou');
    });
});
/// rodar servidor
servidor.listen(1234, function ()
{
    console.log('servidor rodando na porta 1234');
});