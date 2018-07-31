import Base from '../layouts/base'
import Link from 'next/link'


const About = () => {
  return (
    <Base>
      <h1>About</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </Base>
  )
}

export default About