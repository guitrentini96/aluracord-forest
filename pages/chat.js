import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {

    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    /*
        Usuario
            - Digita no campo textarea
            - aperta no enter para enviar
            - tem que adicionar o text na listagem
        Dev
            - campo criado
            - usar onChange usa o useState (ter if para caso seja enter para limpar a variavel)
            - lista de mensagens
    */

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length + 1,
            de: 'guitrentini96',
            texto: novaMensagem,
        };
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ]);
        setMensagem("");
    }

    function deleteMessage(message_id) {
        setListaDeMensagens([
            ...listaDeMensagens.filter((msg) => {
                return msg.id != message_id
            })
        ])
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://cache.desktopnexus.com/cropped-wallpapers/2456/2456540-1920x1080-[DesktopNexus.com].jpg?st=cIAuinzVsaFGaAiupcW-8g&e=1643085086)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    opacity: '90%',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} deletarMensagem={deleteMessage} />

                    {/* {listaDeMensagens.map((currentMessage) => {
                        return (
                            <li key={currentMessage.id}>
                                {currentMessage.de}: {currentMessage.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'flex-start',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                setMensagem(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();

                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Write you message here..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            label='Send'
                            onClick={() => {
                                handleNovaMensagem(mensagem);
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals["050"],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[500],
                            }}
                            styleSheet={{
                                height: "80%"
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props.mensagens)
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex'
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>

                            <Text
                                styleSheet={{
                                    fontSize: '14px',
                                    marginLeft: 'auto',
                                    color: appConfig.theme.colors.neutrals[300],
                                    hover: {
                                        cursor: "pointer"
                                    }
                                }}
                                tag="span"
                                onClick={() => {
                                    props.deletarMensagem(mensagem.id)
                                }}
                            >
                                x

                            </Text>

                        </Box>
                        {mensagem.texto}
                    </Text>

                )
            })}
        </Box>
    )
}