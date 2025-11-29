// ==========================================
// BLOG SYSTEM - URL Routing & Modal Management
// ==========================================

let allPosts = [];
let displayedCount = 0;
const postsPerPage = 6;

// ==========================================
// UTILITY: Generate SEO-friendly slug from title
// ==========================================
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')      // Replace spaces with dashes
    .replace(/-+/g, '-')       // Replace multiple dashes with single dash
    .trim();
}

// ==========================================
// UTILITY: Format date
// ==========================================
function formatDate(dateString) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
  ];
  const date = new Date(dateString);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ==========================================
// UTILITY: Update SEO meta tags
// ==========================================
function updateSEOTags(post = null) {
  if (post) {
    // Update title
    document.title = `${post.title} | Naskah Prima`;
    
    // Update description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', post.excerpt);
    }
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', post.title);
    if (ogDesc) ogDesc.setAttribute('content', post.excerpt);
  } else {
    // Reset to default
    document.title = "Publikasi Jurnal SINTA Informatika Rp 300k - Bayar Setelah LOA | Naskah Prima";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Mahasiswa Informatika S1 butuh publikasi jurnal SINTA murah? Naskah Prima editor profesional informatika, harga Rp 300k-1.4jt, bayar 100% setelah LOA keluar, plagiarism check gratis. 95% success rate, 20+ published.");
    }
  }
}

// ==========================================
// LOAD BLOG POSTS
// ==========================================
async function loadBlogPosts() {
  try {
    const response = await fetch("./blog-posts.json");
    const data = await response.json();

    // Sort by date (newest first)
    allPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Auto-generate slug if not exists
    allPosts.forEach(post => {
      if (!post.slug) {
        post.slug = generateSlug(post.title);
      }
    });

    // Display initial posts
    displayPosts(postsPerPage);

    // Setup Load More button
    setupLoadMoreButton();

    // Handle URL hash (if user opens direct link)
    handleURLHash();

  } catch (error) {
    console.error("Error loading blog posts:", error);
    document.getElementById("blogGrid").innerHTML =
      '<p style="text-align:center; color:var(--danger); padding:2rem;">Gagal memuat artikel. Coba refresh halaman.</p>';
  }
}

// ==========================================
// DISPLAY POSTS
// ==========================================
function displayPosts(count) {
  const blogGrid = document.getElementById("blogGrid");

  // Get posts to show
  const postsToShow = allPosts.slice(displayedCount, displayedCount + count);

  // Clear loading state on first load
  if (displayedCount === 0) {
    blogGrid.innerHTML = "";
  }

  // Create cards with staggered animation
  postsToShow.forEach((post, index) => {
    const card = createBlogCard(post);

    setTimeout(() => {
      card.style.opacity = "0";
      blogGrid.appendChild(card);

      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
      }, 10);
    }, index * 100);
  });

  displayedCount += postsToShow.length;
  updateLoadMoreButton();
}

// ==========================================
// CREATE BLOG CARD
// ==========================================
function createBlogCard(post) {
  const card = document.createElement("div");
  card.className = "blog-card";
  
  // Click handler with URL update
  card.onclick = () => openBlogModal(post.slug);

  card.innerHTML = `
    <div class="blog-card-header">
      <span class="blog-category">${post.category}</span>
      <span class="blog-date">📅 ${formatDate(post.date)}</span>
    </div>
    <h3 class="blog-card-title">${post.title}</h3>
    <p class="blog-card-excerpt">${post.excerpt}</p>
    <div class="blog-card-footer">
      <span class="blog-read-time">⏱️ ${post.readTime}</span>
      <span class="blog-read-more">Baca Selengkapnya →</span>
    </div>
  `;

  return card;
}

// ==========================================
// SETUP LOAD MORE BUTTON
// ==========================================
function setupLoadMoreButton() {
  const blogGrid = document.getElementById("blogGrid");
  let loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!loadMoreBtn) {
    loadMoreBtn = document.createElement("div");
    loadMoreBtn.id = "loadMoreBtn";
    loadMoreBtn.className = "load-more-container";
    loadMoreBtn.innerHTML = `
      <button class="btn-load-more">
        📖 Muat Artikel Lainnya
      </button>
      <p class="load-more-info">
        Menampilkan <span id="displayedPostsCount">${displayedCount}</span> dari <span id="totalPostsCount">${allPosts.length}</span> artikel
      </p>
    `;

    blogGrid.parentNode.insertBefore(loadMoreBtn, blogGrid.nextSibling);

    loadMoreBtn.querySelector(".btn-load-more").addEventListener("click", () => {
      displayPosts(postsPerPage);
    });
  }

  updateLoadMoreButton();
}

// ==========================================
// UPDATE LOAD MORE BUTTON
// ==========================================
function updateLoadMoreButton() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const button = loadMoreBtn?.querySelector(".btn-load-more");
  const displayedSpan = document.getElementById("displayedPostsCount");
  const totalSpan = document.getElementById("totalPostsCount");

  if (loadMoreBtn) {
    if (displayedSpan) displayedSpan.textContent = displayedCount;
    if (totalSpan) totalSpan.textContent = allPosts.length;

    if (displayedCount >= allPosts.length) {
      if (button) button.style.display = "none";

      const infoText = loadMoreBtn.querySelector(".load-more-info");
      if (infoText) {
        infoText.innerHTML = "✅ Semua artikel sudah ditampilkan";
        infoText.style.color = "var(--success)";
        infoText.style.fontWeight = "600";
      }
    } else {
      if (button) button.style.display = "block";
    }
  }
}

// ==========================================
// OPEN BLOG MODAL (with URL update)
// ==========================================
function openBlogModal(slug) {
  // Find post by slug
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    // Post not found - show error
    alert("Artikel tidak ditemukan!");
    window.location.hash = "#blog";
    return;
  }

  // Update URL
  window.location.hash = `#blog/${slug}`;

  // Update SEO tags
  updateSEOTags(post);

  // Populate modal
  const modal = document.getElementById("blogModal");
  document.getElementById("modalCategory").textContent = post.category;
  document.getElementById("modalTitle").textContent = post.title;
  document.getElementById("modalDate").textContent = formatDate(post.date);
  document.getElementById("modalReadTime").textContent = `⏱️ ${post.readTime}`;
  document.getElementById("modalContent").innerHTML = post.content;

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ==========================================
// CLOSE BLOG MODAL
// ==========================================
function closeBlogModal() {
  const modal = document.getElementById("blogModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";

  // Reset URL to #blog
  window.location.hash = "#blog";

  // Reset SEO tags
  updateSEOTags();
}

// ==========================================
// HANDLE URL HASH (on page load / hash change)
// ==========================================
function handleURLHash() {
  const hash = window.location.hash;

  // Check if hash is blog article URL
  if (hash.startsWith("#blog/")) {
    const slug = hash.replace("#blog/", "");
    
    // Open modal with slug
    openBlogModal(slug);
  } else if (hash === "#blog") {
    // Just close modal if open
    closeBlogModal();
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Close modal when ESC key pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBlogModal();
});

// Handle hash change (back/forward buttons)
window.addEventListener("hashchange", handleURLHash);

// Load posts when page ready
document.addEventListener("DOMContentLoaded", loadBlogPosts);