import React from 'react'
import axios from 'axios'
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

import Base from '../layouts/base'
import Link from 'next/link'
import Head from 'next/head'

import Tag from '../components/Tag'
import Conf from '../components/Conf'


class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      topics: [],
      conferences: [],
    }
  }

  static async getInitialProps(ctx) {
    const topic = ctx.query.topic
    const url = 'http://localhost:3001/conferences?topics_like='+topic
    const res = await fetch(url)
    const conferences = await res.json()

    return { conferences, topic }
  }

  componentDidMount() {
    const url = 'http://localhost:3001/topics'

    axios
    .get(url)
    .then(response => {
      const topics = response.data
      this.setState({ topics })
    })
    .catch(error => {
      console.log('error', error)
    })
  }

  render() {
    const { topic, conferences } = this.props
    const { topics } = this.state
    return (
      <Base>
        <Head>
          <title>Confs {topic}</title>
        </Head>
        <div className="container">
          <header className="header">
            <h1>Confs {topic}</h1>
          </header>
          <div className="row">
            <aside className="sidebar">
              <div>
                <h5 className="subtitle">
                  Topics
                </h5>
                <ul className="tags">
                  { topics.map(topic => <Tag key={ topic } topic={topic} />) }
                </ul>
              </div>
              <div>
                <h5 className="subtitle">
                  About
                </h5>
                <ul className="links">
                  <li className="link">
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                  <li className="link">
                    <Link href="/privacity">
                      <a>Privacity</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
            <main className="main">
              <h5 className="subtitle">
                Conferences
              </h5>

              { conferences.map(conference => (
                <Conf key={ conference.id } conference={ conference } />
              )) }
            </main>
          </div>
        </div>
      </Base>
    )
  }
}

export default withRouter(Index)