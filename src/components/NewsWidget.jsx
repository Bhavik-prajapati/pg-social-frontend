import './NewsWidget.css';

function NewsWidget() {
  const news = [
    "React 19 is coming with huge improvements!",
    "PostgreSQL 16 performance benchmarks released.",
    "LinkedIn testing new UI for recruiters.",
  ];

  return (
    <div className="news-widget">
      <h3>Trending News</h3>
      <ul>
        {news.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default NewsWidget;
