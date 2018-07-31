import React from 'react'
import axios from 'axios'
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
    }
  }

  static async getInitialProps(ctx) {
    const url = 'http://localhost:3001/conferences'
    const res = await fetch(url)
    const conferences = await res.json()

    return { conferences }
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
    const { topics } = this.state
    const { conferences } = this.props
    return (
      <Base>
        <Head>
          <title>Confs Tech</title>
        </Head>
        <div className="container">
          <header className="header">
            <h1>Confs tech</h1>
            <p>Find and explore the most important conferences in worldwide</p>
  
            <Link href="/add">
              <a className="header-btn">Add conference</a>
            </Link>
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

export default Index