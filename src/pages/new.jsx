import React, { useState } from "react";
import { Menu, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian
  const navigate = useNavigate(); // navigasi antar halaman

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Menavigasi ke halaman pencarian dengan kata kunci yang dimasukkan
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Daftar item menu untuk navigasi
  const menuItems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "programming", label: <Link to="/programming">Programming</Link> },
    { key: "indonesia", label: <Link to="/indonesia">Indonesia</Link> },
    { key: "mostPopular", label: <Link to="/mostPopular">Most Popular</Link> },
    { key: "save", label: <Link to="/save">Saved</Link> },
    {
      key: "search",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            placeholder="Search articles..." // Placeholder untuk input pencarian
            value={searchTerm} // Nilai input yang terikat pada state
            onChange={(e) => setSearchTerm(e.target.value)} // Mengubah state ketika input berubah
            onPressEnter={handleSearch} // Menangani pencarian saat menekan tombol Enter
            style={{ width: 200, marginRight: 10 }}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Menu mode="horizontal" items={menuItems} style={{ lineHeight: "64px" }} />
  );
};

export default Navbar;
