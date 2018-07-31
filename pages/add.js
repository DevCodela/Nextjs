import React from 'react'
import Select from 'react-select'

import Base from '../layouts/base'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'


class Add extends React.Component {
  constructor() {
    super()
    this.state = {
      topics: [],
      topicsAPI: [],
      title: '',
      url: '',
      place: '',
      start: '',
      end: '',
    }
  }
  componentDidMount() {
    const url = 'http://localhost:3001/topics'

    axios
    .get(url)
    .then(response => {
      const topicsAPI = response.data.map(topic => {
        return {
          value: topic,
          label: topic,
        }
      })
      this.setState({ topicsAPI })
    })
  }
  submit = (e) => {
    e.preventDefault()
    console.log('Enviado', this.state)
    const url = 'http://localhost:3001/conferences'
    const topics = this.state.topics.map(topic => topic.value)
    const conf = {
      title: this.state.title,
      url: this.state.url,
      place: this.state.place,
      start: this.state.start,
      end: this.state.end,
      topics,
    }

    axios
    .post(url, conf)
    .then(response => {
      console.log('data', response.data)
    })
    .catch(error => {
      console.error('error', error)
    })
  }
  changeInput = (e) => {
    const value = e.target.value
    const name = e.target.name

    this.setState({ [name]: value })
  }
  changeSelect = (topics) => {
    this.setState({ topics })
  }
  render() {
    const { topics, topicsAPI } = this.state
    return (
      <Base>
        <Head>
          <title>Add conference</title>
          <link rel="stylesheet" href="https://unpkg.com/react-select@1.2.1/dist/react-select.css" />
        </Head>
        <div className="container">
          <h1>Add Conference</h1>
          <form onSubmit={ this.submit } className="form">
            <div className="form-row">
              <label htmlFor="title">Title</label>
              <input
                onChange={ this.changeInput }
                id="title"
                name="title"
                type="text"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="url">URL</label>
              <input
                onChange={ this.changeInput }
                id="url"
                name="url"
                type="url"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="place">Place</label>
              <input
                onChange={ this.changeInput }
                id="place"
                name="place"
                type="text"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="start">Start</label>
              <input
                onChange={ this.changeInput }
                id="start"
                name="start"
                type="date"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="end">End</label>
              <input
                onChange={ this.changeInput }
                id="end"
                name="end"
                type="date"
                required
              />
            </div>
            <div className="form-row">
              <label>Topics</label>
              <Select
                onChange={ this.changeSelect }
                value={ topics }
                options={ topicsAPI }
                multi={ true }
              />
            </div>
            <div className="form-row">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Base>
    )
  }
}

export default Add