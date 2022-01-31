function GlobalStyle() {
  return (
    <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
        *::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .loading {
          display: inline-block;
          width: 80px;
          height: 80px;
          margin: auto;
        }
        .loading:after {
          content: " ";
          display: block;
          width: 64px;
          height: 64px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #fff;
          border-color: #fff transparent #fff transparent;
          animation: loading 1.2s linear infinite;
        }
        @keyframes loading {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        a{
          text-decoration: none
        }
      `}</style>
  );
}

export default function CustomApp({ Component, pageProps }) {
  console.log('Roda em todas as paginas!');
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )

}