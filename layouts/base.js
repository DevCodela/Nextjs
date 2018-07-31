import React from 'react'
import Head from 'next/head'


const Base = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/static/css/main.css"/>
        <meta name="viewport" content="width=devide-width" />
      </Head>
      { children }
    </React.Fragment>
  )
}

export default Base