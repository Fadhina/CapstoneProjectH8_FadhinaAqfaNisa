import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Skeleton, Alert, Typography, Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveArticle, unsaveArticle } from "../redux/articlesSlice";
import { Link as RouterLink } from "react-router-dom"; // Menambahkan RouterLink untuk routing internal

const { Title, Paragraph, Link } = Typography;

const Articles = ({ category, searchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.articles.savedArticles);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_NYT_API_KEY;
        console.log("API Key:", apiKey); // Memverifikasi API Key

        if (!apiKey) {
          throw new Error("API key is missing");
        }

        let url;

        if (category === "mostPopular") {
          url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
        } else {
          const query = searchTerm || category;
          url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
            query
          )}&api-key=${apiKey}`;
        }

        const response = await axios.get(url);
        console.log("API Response:", response); // Memverifikasi response API

        if (category === "mostPopular" && response.data.results) {
          setData(response.data.results);
        } else if (response.data.response?.docs) {
          setData(response.data.response.docs);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        const message =
          err.response?.status === 429
            ? "Too many requests. Please try again later."
            : err.message;
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchTerm]);

  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card>
              <Skeleton active />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={`Something went wrong: ${error}`}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>
        {category === "mostPopular"
          ? "Most Popular Articles"
          : `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`}
      </Title>
      <Row gutter={[16, 16]}>
        {data.map((article, index) => {
          const title =
            category === "mostPopular" ? article.title : article.headline?.main;
          const description = article.abstract || "No description available.";
          const imageUrl =
            category === "mostPopular"
              ? article.media?.[0]?.["media-metadata"]?.[2]?.url
              : article.multimedia?.[0]?.url
              ? `https://static01.nyt.com/${article.multimedia[0].url}`
              : null;
          const isSaved = savedArticles.some((saved) => saved.title === title);

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                title={title || "No Title Available"}
                hoverable
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title || "Article Image"}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                    width="100%"
                    height={150}
                  />
                ) : (
                  <div
                    style={{
                      height: 150,
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <Paragraph style={{ color: "#999" }}>
                      No Image Available
                    </Paragraph>
                  </div>
                )}
                <Paragraph ellipsis={{ rows: 3 }}>{description}</Paragraph>
                <RouterLink
                  to={`/article/${encodeURIComponent(title)}`} // Link menuju halaman artikel detail
                  style={{ marginRight: "20px" }}
                >
                  Read More
                </RouterLink>
                <Button
                  type={isSaved ? "dashed" : "primary"}
                  onClick={() =>
                    dispatch(
                      isSaved
                        ? unsaveArticle(title)
                        : saveArticle({
                            title,
                            description,
                            source: article.source || "Unknown",
                          })
                    )
                  }
                  style={{ marginTop: "10px" }}
                >
                  {isSaved ? "Unsave" : "Save"}
                </Button>
                <Paragraph
                  style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}
                >
                  Source: {article.source || "Unknown"}
                </Paragraph>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Articles;
