import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5MjgwNywiZXhwIjoxOTU4OTY4ODA3fQ.iEZwKXS_oXfRhtUi_Yv2KwVneGWhVtx0HKFhitJf-kQ";
const SUPABASE_URL = "https://rehvnnslcckwjiyzquvc.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('messages')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe()
}

export default function ChatPage() {

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('messages')
            .select('*')
            // .order('id', { ascending: false })
            .then(({ data }) => {
                console.log("todas as mensagens: ", data);
                document.querySelector(".loading").style.display = "none";
                setListaDeMensagens(data);
            });
        escutaMensagensEmTempoReal((novaMensagem) => {
            // console.log("Nova mensagem: ", novaMensagem);
            // para reusar um valor de referencia, passa uma funçao pro setState
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    ...valorAtualDaLista,
                    novaMensagem
                ]
            });
        });
    }, [])

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
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('messages')
            .insert([mensagem])
            .then(({ data }) => {
                console.log('criando nova mensagem: ', data)
            });

        setMensagem("");
    }

    function deleteMessage(message_id) {
        setListaDeMensagens([
            ...listaDeMensagens.filter((msg) => {
                return msg.id != message_id
            })
        ])
        supabaseClient
            .from('messages')
            .delete()
            .eq('id', message_id)
            .then(data => {
                console.log(data)
            })
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
                    <Box className="loading"
                        styleSheet={{
                            positon: 'absolute',
                            marginTop: '25vh'
                        }}
                    ></Box>

                    <MessageList mensagens={listaDeMensagens} deletarMensagem={deleteMessage} user={usuarioLogado} />

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
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                console.log("[USANDO O COMPONENTE]salva esse sticker no banco", sticker)
                                handleNovaMensagem(':sticker: ' + sticker);
                            }} />
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
                                height: "80%",
                                marginLeft: '10px'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box >
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
    // MessageList.onreadystatechange = function () {
    //     if (MessageList.readyState !== "complete") {
    //         console.log("Loading")
    //     } else {
    //         console.log("Loaded")
    //     }
    // };
    // console.log(props.mensagens)

    const [currentUserLocation, setCurrentUserLocation] = React.useState('');
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {

                let autorMensagemAnterior = props.mensagens.indexOf(mensagem) > 0
                    ? props.mensagens[props.mensagens.indexOf(mensagem) - 1]["de"]
                    : "";
                // if (props.mensagens.indexOf(mensagem) === 0) {
                //     console.log(`Primeira mensagem(${props.mensagens.indexOf(mensagem)}): ${mensagem.texto}`)
                // }
                // else {
                //     console.log(`Mensagem numero ${props.mensagens.indexOf(mensagem)}: ${mensagem.texto}`)
                //     console.log(`Mensagem anterior (${props.mensagens.indexOf(mensagem) - 1}): ${props.mensagens[props.mensagens.indexOf(mensagem) - 1].texto}`)
                // }
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginTop: autorMensagemAnterior != mensagem.de && ('12px'),
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        {autorMensagemAnterior != mensagem.de && (

                            // Box com foto, username e data
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Box
                                    onMouseEnter={(event) => {
                                        console.log(event);
                                        document.querySelector(`.banner${mensagem.id}`).style.display = 'flex';
                                        document.querySelector(`.image${mensagem.id}`).style.display = "none"
                                        document.querySelector(`.sender${mensagem.id}`).style.display = 'none'
                                        fetch(`https://api.github.com/users/${mensagem.de}`)
                                            .then(async (response) => {
                                                const responseJSON = await response.json();
                                                setCurrentUserLocation(responseJSON.location);
                                            })
                                    }}
                                    onMouseLeave={(event) => {
                                        console.log(event)
                                        document.querySelector(`.banner${mensagem.id}`).style.display = 'none'
                                        document.querySelector(`.image${mensagem.id}`).style.display = "block"
                                        document.querySelector(`.sender${mensagem.id}`).style.display = 'block'
                                        setCurrentUserLocation('');
                                    }}

                                >

                                    <Image
                                        className={`image${mensagem.id}`}
                                        styleSheet={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                        src={`https://github.com/${mensagem.de}.png`}
                                    />
                                    <Box className={`banner${mensagem.id}`}
                                        styleSheet={{
                                            position: 'relative',
                                            padding: '20px',
                                            backgroundColor: appConfig.theme.colors.neutrals[800],
                                            display: 'none',
                                            borderRadius: '5px'
                                        }}>
                                        <Image
                                            styleSheet={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                marginRight: '15px',
                                            }}
                                            src={`https://github.com/${mensagem.de}.png`}
                                        />
                                        <Box styleSheet={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <Text tag="a" href={`https://github.com/${mensagem.de}`}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                styleSheet={{
                                                    fontSize: "2rem",
                                                    color: "white"
                                                }}>
                                                {mensagem.de}
                                            </Text>
                                            <Text>
                                                {currentUserLocation}
                                            </Text>

                                        </Box>

                                    </Box>
                                </Box>
                                <Text tag="strong" className={`sender${mensagem.id}`}>
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
                            </Box>
                        )}

                        {/* Box com mensagem e icone de excluir: */}
                        <Box
                            styleSheet={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                            {/* mensagem: */}
                            {mensagem.texto.startsWith(':sticker:')
                                ? (
                                    <Image src={mensagem.texto.replace(':sticker:', "")}
                                        styleSheet={{
                                            maxWidth: '200px',
                                            maxHeight: '200px'
                                        }} />
                                )
                                : (
                                    <Text>{mensagem.texto}</Text>
                                )}
                            {/* aqui vai o icone de excluir:  */}
                            {props.user === mensagem.de && (


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
                            )}
                        </Box>
                    </Text>

                )
            })}
        </Box>
    )
}