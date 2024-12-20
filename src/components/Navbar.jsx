import React, { useState } from "react";
import { Menu, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); //fungsi handle search

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const menuItems = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "programming",
      label: <Link to="/programming">Programming</Link>,
    },
    {
      key: "indonesia",
      label: <Link to="/indonesia">Indonesia</Link>,
    },
    {
      key: "save",
      label: <Link to="/save">Saved</Link>,
    },
    {
      key: "search",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ width: 200, marginRight: 10 }}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      ),
      style: { marginLeft: "auto" },
    },
  ];

  return (
    <Menu mode="horizontal" style={{ lineHeight: "64px" }} items={menuItems} />
  );
};

export default Navbar;
