import Link from 'next/link'


const Tag = ({ topic }) => {
  return (
    <Link as={`/topics/${topic}`  } href={ `/topics?topic=${topic}` }>
      <a className="tag">{ topic }</a>
    </Link>
  )
}

export default Tag