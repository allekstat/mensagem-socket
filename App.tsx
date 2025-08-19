import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import cliente_socket from './socket/cliente';
import SelectDropdown from 'react-native-select-dropdown';
export default function meu_socket()
{
    // const prefixo_sala: string = 'chat';
    /// formulário 1
    const [mensagem_atual, set_mensagem_atual] = useState('');
    const [nome, set_nome] = useState('');
    const [codigo_chat, set_codigo_chat] = useState('1');
    const mensagens: string[] = [];
    // const [mensagem_recebida, set_mensagem_recebida] = useState('');
    /// formulário 2
    // const [mensagem_atual_2, set_mensagem_atual_2] = useState('');
    // const [mensagem_recebida_2, set_mensagem_recebida_2] = useState('');
    ///
    // const [mensagens, set_mensagens] = useState([''ring])
    /// recebedores
    useEffect(function ()
    {
        // cliente_socket.emit('join_room', 'chat-2');
        cliente_socket.on('recebimento_mensagem', function (sinal: {sala: string, mensagem: string, usuario: string})
        {
            // console.log(sinal);
            console.log('recebendo mensagem');
            if (sinal.sala === `chat-${codigo_chat.trim()}`/*  && sinal.usuario !== nome.trim() */)
            {
                // set_mensagem_recebida(resposta.mensagem);
                mensagens.push(sinal.mensagem);
            }
            // console.log(mensagens);
        });
        return function ()
        {
            console.log('saindo??');
            cliente_socket.off('recebimento_mensagem');
        }
        //
    }, []);
    useEffect(function ()
    {
        cliente_socket.emit('entrar_sala', `chat-${codigo_chat}`);
    }, [codigo_chat]);
    function enviar_mensagem()
    {
        console.log('enviando mensagem');
        const sala_alvo = `chat-${codigo_chat.trim()}`;
        const mensagem = mensagem_atual.trim();
        const usuario = nome.trim();
        cliente_socket.emit('envio_mensagem',
        {
            sala: sala_alvo, mensagem, usuario
        });
        console.log(sala_alvo, mensagem, usuario)
        // console.log('enviando mensagem', mensagem, 'no chat', chat);
    }
    const estilos = StyleSheet.create(
    {
        caixa_codigo:
        {
            display: 'flex',
            flexDirection: 'row',
            // flexGrow: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // width: 100
        },
        texto_codigo:
        {
            marginRight: 4
        },
        input_codigo:
        {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'lightgrey',
            borderRadius: 4,
            flexGrow: 1,
            paddingHorizontal: 4
            // marginLeft: 4
        },
        caixa_nome:
        {
            display: 'flex',
            flexDirection: 'row',
            // flexGrow: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // width: 100,
            marginBottom: 4
        },
        texto_nome:
        {
            marginRight: 4
        },
        input_nome:
        {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'lightgrey',
            borderRadius: 4,
            flexGrow: 1,
            paddingHorizontal: 4
            // marginLeft: 4
        },
        /// mensagens do meio
        caixa_chat:
        {
            flexGrow: 1,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'lightgrey',
            borderRadius: 4,
            marginVertical: 4,
            paddingHorizontal: 4
        },
        /// parte de baixo
        caixa_mensagem:
        {
            // alignSelf: 'flex-end'
            display: 'flex',
            flexDirection: 'row'
        },
        input_mensagem:
        {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'lightgrey',
            borderRadius: 4,
            marginRight: 4,
            paddingHorizontal: 4
        },
        botao_mensagem:
        {
            backgroundColor: 'blue',
            padding: 4,
            borderRadius: 4
        },
        texto_botao_mensagem:
        {
            color: 'white'
        },
        // titulo: {},
        // entrada: {},
        // botao: {},
        // linha:
        // {
        //     borderBottomWidth: 2,
        //     borderColor: 'black'
        // },
    });
    const html =
    <View style={
    {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 'auto',
        marginVertical: 6
        // flex: 1,
        // height: '100%',
        // justifyContent: 'flex-start',
        // alignItems: 'stretch'
        // padding: 4
    }}>
        <View style={estilos.caixa_nome}>
            <Text style={estilos.texto_nome}>
                escolha seu nome
            </Text>
            <TextInput style={estilos.input_nome} value={nome} onChangeText={set_nome}></TextInput>
        </View>
        <View style={estilos.caixa_codigo}>
            <Text style={estilos.texto_codigo}>
                escolha seu chat
            </Text>
            <TextInput style={estilos.input_codigo} value={codigo_chat} onChangeText={set_codigo_chat}></TextInput>
        </View>
        <View style={estilos.caixa_chat}>
            {1}
        </View>
        <View style={estilos.caixa_mensagem}>
            <TextInput style={estilos.input_mensagem} placeholder='digite uma mensagem' placeholderTextColor='gray' value={mensagem_atual} onChangeText={set_mensagem_atual}></TextInput>
            <TouchableOpacity style={estilos.botao_mensagem} onPress={enviar_mensagem}>
                <Text style={estilos.texto_botao_mensagem}>enviar mensagem</Text>
            </TouchableOpacity>
        </View>
        {/* <View>
            <Text style={estilos.titulo}>canal: chat 1</Text>
            <TextInput style={estilos.entrada} placeholder='digite sua mensagem' value={mensagem_atual_1} onChangeText={set_mensagem_atual_1}></TextInput>
            <TouchableOpacity style={estilos.botao} onPress={function () {enviar_mensagem('1')}}>
                <Text>enviar mensagem</Text>
            </TouchableOpacity>
            <Text>mensagem recebida:</Text>
            <Text>{mensagem_recebida_2 || 'nenhuma mensagem recebida'}</Text>
        </View>
        <View style={estilos.linha}></View>
        <View>
            <Text>canal: chat 2</Text>
            <TextInput placeholder='digite sua mensagem' value={mensagem_atual_2} onChangeText={set_mensagem_atual_2}></TextInput>
            <TouchableOpacity onPress={function () {enviar_mensagem('2')}}>
                <Text>enviar mensagem</Text>
            </TouchableOpacity>
            <Text>mensagem recebida:</Text>
            <Text>{mensagem_recebida_1 || 'nenhuma mensagem recebida'}</Text>
        </View> */}
    </View>;
    return html;
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,         
        borderRadius: 5,             
        alignItems: 'center',        
        marginBottom: 20,            
    },
    buttonText: {
        color: '#fff',               
        fontSize: 16,                
        fontWeight: 'bold',          
    },
    receivedMessageTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    line: {
        padding: 1,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#000'
    },
    receivedMessage: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e8e8e8',
        borderRadius: 5,
        textAlign: 'center',
    },
});