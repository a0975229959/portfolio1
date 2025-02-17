// 平滑捲動
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollTop;
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// 載入文章
async function loadPosts() {
  const loading = document.getElementById("loading");
  const postsDiv = document.getElementById("posts");

  loading.style.display = "block";
  postsDiv.innerHTML = "";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3"
    );
    const posts = await response.json();

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.style.margin = "20px";
      postElement.style.padding = "20px";
      postElement.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      postElement.style.borderRadius = "8px";
      postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    `;
      postsDiv.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error:", error);
    postsDiv.innerHTML = "<p>載入失敗，請稍後再試</p>";
  } finally {
    loading.style.display = "none";
  }
}

// 載入作品集
async function loadPortfolio() {
  const portfolioGrid = document.getElementById("portfolio-grid");

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=6"
    );
    const photos = await response.json();

    photos.forEach((photo) => {
      const portfolioItem = document.createElement("div");
      portfolioItem.className = "portfolio-item";
      portfolioItem.innerHTML = `
                        <img src="/api/placeholder/400/320" alt="${photo.title}">
                        <div class="portfolio-content">
                            <h3>${photo.title}</h3>
                        </div>
                    `;
      portfolioGrid.appendChild(portfolioItem);
    });
  } catch (error) {
    console.error("Error:", error);
    portfolioGrid.innerHTML = "<p>載入失敗，請稍後再試</p>";
  }
}

// 表單提交
document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("訊息已送出！");
        e.target.reset();
      } else {
        throw new Error("送出失敗");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("送出失敗，請稍後再試");
    }
  });

// 頁面載入時執行
window.addEventListener("load", () => {
  loadPortfolio();
});
