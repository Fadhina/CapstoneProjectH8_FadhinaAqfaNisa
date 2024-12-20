import React from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Row, Col, Spin, Alert } from "antd";
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
        const apiKey = import.meta.env.VITE_NYT_API_KEY; //mengambil api key dari file env
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
          title
        )}&api-key=${apiKey}`;
        const response = await axios.get(url);

        if (response.data.response.docs.length > 0) {
          const fullArticleUrl =
            response.data.response.docs[0]?.web_url ||
            response.data.response.docs[0]?.url;
          if (fullArticleUrl) {
            window.location.href = fullArticleUrl;
          }
          setArticle(response.data.response.docs[0]);
        } else {
          throw new Error("Article not found");
        }
      } catch (err) {
        setError(err.message || "Error fetching article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

  if (loading) {
    return <Spin size="large" style={{ marginTop: "50px" }} />;
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>
              {article.headline?.main || "No Title Available"}
            </Title>
            <Paragraph>
              {article.abstract || "No abstract available."}
            </Paragraph>
            {article.lead_paragraph && (
              <Paragraph>{article.lead_paragraph}</Paragraph>
            )}
            {article.multimedia?.[0]?.url && (
              <img
                src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                alt="Article"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginTop: "20px",
                }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleDetail;
