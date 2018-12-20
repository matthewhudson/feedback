import React from 'react'
import MQ from 'react-responsive'
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
        width="100%"
        maxWidth={1040}
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Pane width="100%" maxWidth={600}>
          {children}
        </Pane>
        <MQ query="(min-device-width: 800px)">
          <Pane width={400}>
            <Pane position="fixed" top="20%">
              <Form baseId="app3tDto8jKhjzBsa" table="Submissions" />
            </Pane>
          </Pane>
        </MQ>
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
