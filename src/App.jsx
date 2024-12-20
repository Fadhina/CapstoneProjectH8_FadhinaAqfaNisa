import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Articles";
import Save from "./components/Save";
import SearchResults from "./components/SearchResult";
import ArticleDetail from "./components/ArticleDetail";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/programming"
          element={<Articles category="programming" />}
        />
        <Route path="/indonesia" element={<Articles category="indonesia" />} />
        <Route path="/save" element={<Save />} />
        <Route path="/" element={<Articles category="mostPopular" />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/article/:title" element={<ArticleDetail />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
