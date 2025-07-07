import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import ReactMarkdown from "react-markdown";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch(console.error);
  }, [id]);

  if (!blog) return <p style={{ padding: "1rem" }}>Loading...</p>;

  return (
    <main style={{ padding: "1rem" }}>
      <h2>{blog.title}</h2>
      <small>{new Date(blog.createdAt).toLocaleString()}</small>
      <hr />
      <ReactMarkdown>{blog.content}</ReactMarkdown>
    </main>
  );
};

export default BlogView;
