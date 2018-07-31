import Tag from './Tag'


const Conf = ({ conference }) => {
  return (
    <article key={ conference.id } className="article">
      <h2 className="article-title">
        <a ahref={ conference.url }>
          { conference.title }
        </a>
      </h2>
      <p className="article-description">{ conference.place } | { conference.start } - { conference.end }</p>

      <div className="tags">
        {
          conference.topics.map(topic => <Tag key={ topic } topic={ topic } />)
        }
      </div>
    </article>
  )
}

export default Conf