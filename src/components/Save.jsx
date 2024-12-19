import React from "react";
import { Table, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Text } = Typography;

const Save = () => {
  const savedArticles = useSelector((state) => state.articles.savedArticles);

  const columns = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (text, record) => (
        <Link to={`/article/${record.title}`} target="_blank">
          <Text type="secondary">Go to Article</Text>
        </Link>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Articles</h2>
      <Table
        dataSource={savedArticles}
        columns={columns}
        rowKey={(record) => record.title}
      />
    </div>
  );
};

export default Save;
