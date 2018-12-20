import React from 'react'
import { Pane } from 'evergreen-ui'
import Form from '../components/form'
import App, { Container } from 'next/app'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Pane
        paddingY={24}
        display="flex"
        marginX="auto"
        maxWidth={1040}
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Pane maxWidth={600}>{children}</Pane>
        <Pane width={400}>
          <Pane position="fixed" top="20%">
            <Form />
          </Pane>
        </Pane>
      </Pane>
    )
  }
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}
