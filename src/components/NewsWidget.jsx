import axios from 'axios';
import './css/NewsWidget.css';
import { useEffect, useState } from 'react';

function NewsWidget() {
  /*  const news = [
     "React 19 is coming with huge improvements!",
     "PostgreSQL 16 performance benchmarks released.",
     "LinkedIn testing new UI for recruiters.",
   ]; */

  const [news, setNews] = useState([])

  const fetchnews = async () => {
    const response = await axios.get(`http://localhost:5000/api/trending-news`);
    setNews(response.data.news);
  }
  useEffect(() => {

    fetchnews();

  }, [])

  return (
    <div className="news-widget">
  <h3>Trending News</h3>
  <ul>
    {news.slice(0,5).map((item, index) => (
      <li key={index}>
        <h5>{item.headline}</h5>
        <p>{item.summary}</p>
      </li>
    ))}
  </ul>
</div>
    
  );
}

export default NewsWidget;
