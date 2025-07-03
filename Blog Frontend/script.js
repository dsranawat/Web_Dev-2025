fetch("blog-data.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("blogContainer");
    data.forEach(post => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.summary}</p>
        <a class="read-more" href="post.html?id=${post.id}">Read More →</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to load blog data:", err);
  });
