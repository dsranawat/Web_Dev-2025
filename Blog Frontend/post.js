const params = new URLSearchParams(window.location.search);
const postId = parseInt(params.get("id"));

fetch("blog-data.json")
  .then(response => response.json())
  .then(posts => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      document.getElementById("postTitle").textContent = post.title;
      document.getElementById("postContent").textContent = post.content;
    } else {
      document.getElementById("postTitle").textContent = "Post not found.";
      document.getElementById("postContent").textContent = "";
    }
  });
