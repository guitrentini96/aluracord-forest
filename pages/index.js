import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from "../config.json"




function Title(props) {
    const Tag = props.tag || "h1";
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['900']};
                font-size: 24px;
                font-weight: 600;
            }
            `}
            </style>
        </>
    );
}

// Componente react
// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Title tag="h1">Welcome back!</Title>
//             <h2>Discord - Alura Matrix</h2>
//         </div>

//     )
// }
// export default HomePage

export default function PaginaInicial() {
    // const username = 'guitrentini96';
    const [username, setUsername] = React.useState('guitrentini96');
    const roteamento = useRouter();
    const [location, setLocation] = React.useState();


    let timer;


    function fetchLocation() {
        console.log(`fetching ${username}'s location`);
        fetch(`https://api.github.com/users/${username}`)
            .then(async (response) => {
                const responseJSON = await response.json();
                setLocation(responseJSON.location);
            })
    }

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: 'url(https://images7.alphacoders.com/861/861304.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        opacity: "0.9"
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            console.log("alguem submeteu o form");
                            roteamento.push(`/chat?username=${username}`);
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Welcome back!</Title>
                        <Text variant="body3"
                            styleSheet=
                            {{
                                marginBottom: '32px',
                                color: appConfig.theme.colors.neutrals[300]
                            }}>
                            {appConfig.name}
                        </Text>

                        {/* <input type="text" value={username}
                            onChange={function (event) {
                                console.log("Usuario digitou", event.target.value)
                                // onde ta o valor?
                                const valor = event.target.value;
                                // trocar o valor da variavel
                                setUsername(valor);
                            }}
                        /> */}

                        <TextField
                            fullWidth
                            value={username}
                            onChange={function (event) {
                                console.log("Usuario digitou", event.target.value)
                                // onde ta o valor?
                                const valor = event.target.value;
                                // trocar o valor da variavel
                                setUsername(valor);
                            }}
                            onKeyUp={function (event) {
                                timer = setTimeout(() => {
                                    fetchLocation();
                                }, 1000)

                            }}
                            onKeyDown={function (event) {
                                clearTimeout(timer);
                            }}
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Login'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.neutrals["050"],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={(username.length > 2) ? `https://github.com/${username}.png` : ""}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[700],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px',
                            }}
                        >
                            {username}
                            <br></br> {location}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}