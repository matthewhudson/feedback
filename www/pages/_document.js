import Document, { Head, Main, NextScript } from 'next/document'
import { extractStyles } from 'evergreen-ui'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = flush()
    const { css, hydrationScript } = extractStyles()

    return { ...page, css, styles, hydrationScript }
  }

  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }
  }

  render() {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          {this.props.hydrationScript}
          <style
            dangerouslySetInnerHTML={{
              __html: `body{background:#fcfdfe;font-family:"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";}`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
