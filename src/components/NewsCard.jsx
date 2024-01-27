import React from 'react'

const NewsCard = ({news}) => {
    if (!news) return null;
  return (
    <div className='news-card'>
        <h3>{news.title}</h3>
        <a href={news.url}> Read More</a>
    </div>
  )
}

export default NewsCard