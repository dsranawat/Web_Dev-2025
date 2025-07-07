import React, { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", _id: null });

  const loadBlogs = () => {
    API.get("/blogs").then((res) => setBlogs(res.data));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      await API.put(`/blogs/${form._id}`, form);
    } else {
      await API.post("/blogs", form);
    }
    setForm({ title: "", content: "", _id: null });
    loadBlogs();
  };

  const handleEdit = (blog) => {
    setForm(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await API.delete(`/blogs/${id}`);
      loadBlogs();
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h2>🛠 Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        /><br /><br />
        <textarea
          rows="8"
          placeholder="Markdown Content"
          required
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        /><br /><br />
        <button type="submit">{form._id ? "Update" : "Create"} Blog</button>
      </form>

      <hr />
      <h3>📄 Existing Blogs</h3>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ marginBottom: "1rem" }}>
          <h4>{blog.title}</h4>
          <button onClick={() => handleEdit(blog)}>✏️ Edit</button>
          <button onClick={() => handleDelete(blog._id)}>🗑 Delete</button>
        </div>
      ))}
    </main>
  );
};

export default Dashboard;
