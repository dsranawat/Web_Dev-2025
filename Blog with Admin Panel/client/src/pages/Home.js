import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blogs").then(res => setBlogs(res.data)).catch(console.error);
  }, []);

  return (
    <main style={{ padding: "1rem" }}>
      <h2>📚 Public Blog Posts</h2>
      {blogs.map(blog => (
        <div key={blog._id} style={{ borderBottom: "1px solid #aaa", marginBottom: "1rem", paddingBottom: "1rem" }}>
          <h3>{blog.title}</h3>
          <p>{blog.content.substring(0, 100)}...</p>
          <Link to={`/blog/${blog._id}`}>Read More →</Link>
        </div>
      ))}
    </main>
  );
};

export default Home;
