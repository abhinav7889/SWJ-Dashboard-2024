import "../styles/globals.css"
import {FluentProvider, webLightTheme} from "@fluentui/react-components";
function MyApp({ Component, pageProps }) {
  return (
    <FluentProvider theme={webLightTheme}>
      <Component {...pageProps} />
    </FluentProvider>
  )
}

export default MyApp
