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
          <title>UserMirror · Feedback</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          {this.props.hydrationScript}
          <style
            dangerouslySetInnerHTML={{
              __html: `pre{overflow-x:auto;}body{margin:0;background:#fcfdfe;font-family:"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";}`
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
