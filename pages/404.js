import { Box, Button, Text, TextField, Image } from '@skynexui/components'

export default function errorPage404() {
    return (
        <>
            <Text
                variant="heading1"
                styleSheet={{
                    color: "purple",
                    height: "100px",
                    zIndex: "2",
                    margin: "100px"
                }}
            >Looks like you are lost</Text>
            <Image
                src="https://listverse.com/wp-content/uploads/2013/01/YeeeeaaaaaaH-1.jpg"
                styleSheet={{
                    height: "100vh",
                    width: "100vw",
                    position: "fixed"
                }}
            />
        </>
    )

}