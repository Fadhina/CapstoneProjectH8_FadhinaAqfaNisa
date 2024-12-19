import React from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Row, Col, Spin } from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

const ArticleDetail = () => {
  const { title } = useParams();
  const [article, setArticle] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_NYT_API_KEY;
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
          title
        )}&api-key=${apiKey}`;
        const response = await axios.get(url);
        setArticle(response.data.response.docs[0]);
      } catch (err) {
        setError("Error fetching article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error || !article) {
    return <div>Error loading article.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>{article.headline.main}</Title>
            <Paragraph>{article.abstract}</Paragraph>
            <Paragraph>
              <a
                href={article.web_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Full Article
              </a>
            </Paragraph>
            <img
              src={article.multimedia?.[0]?.url}
              alt="Article"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleDetail;
