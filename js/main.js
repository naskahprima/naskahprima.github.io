// ==========================================
// MAIN SITE FUNCTIONALITY
// ==========================================

// ==========================================
// HAMBURGER MENU TOGGLE
// ==========================================
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      
      // Skip if it's a blog article link
      if (href.startsWith("#blog/")) {
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        document.getElementById("navLinks").classList.remove("active");
      }
    });
  });
});

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe elements on page load
document.addEventListener("DOMContentLoaded", () => {
  // Observe achievement cards
  document.querySelectorAll(".achievement-card").forEach((el) => {
    observer.observe(el);
  });

  // Observe USP cards
  document.querySelectorAll(".usp-card").forEach((el) => {
    observer.observe(el);
  });

  // Observe testimonial cards
  document.querySelectorAll(".testimonial-card").forEach((el) => {
    observer.observe(el);
  });
});

// ==========================================
// PRICING CALCULATOR
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const sintaCalc = document.getElementById("sintaLevelCalc");
  
  if (sintaCalc) {
    sintaCalc.addEventListener("change", function () {
      const level = this.value;
      const priceData = {
        6: { basic: "300k", premium: "500k", vip: "900k" },
        5: { basic: "400k", premium: "600k", vip: "1.1jt" },
        4: { basic: "500k", premium: "700k", vip: "1.4jt" },
      };

      if (level && priceData[level]) {
        document.getElementById("selectedSintaNum").textContent = level;
        document.getElementById("calcBasic").textContent = priceData[level].basic;
        document.getElementById("calcPremium").textContent = priceData[level].premium;
        document.getElementById("calcVip").textContent = priceData[level].vip;
        document.getElementById("calcResult").style.display = "block";
      }
    });
  }
});

// ==========================================
// FAQ ACCORDION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".faq-icon");

      // Close other FAQs in same category
      const category = question.closest(".faq-category");
      category.querySelectorAll(".faq-answer").forEach((item) => {
        if (item !== answer) {
          item.classList.remove("active");
          item.previousElementSibling.querySelector(".faq-icon").textContent = "🔽";
        }
      });

      // Toggle current FAQ
      answer.classList.toggle("active");
      icon.textContent = answer.classList.contains("active") ? "🔼" : "🔽";
    });
  });
});

// ==========================================
// FAQ CATEGORY TABS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");

      // Update active button
      document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Show/hide categories
      document.querySelectorAll(".faq-category").forEach((cat) => {
        cat.classList.remove("active");
      });
      
      const targetCategory = document.getElementById(category);
      if (targetCategory) {
        targetCategory.classList.add("active");
      }
    });
  });
});

// ==========================================
// CONTACT FORM WHATSAPP REDIRECT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const university = document.getElementById("university").value;
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value;

      // Get service label
      const serviceSelect = document.getElementById("service");
      const serviceLabel = serviceSelect.options[serviceSelect.selectedIndex].text;

      const text = `Halo Naskah Prima!

Nama: ${name}
Email: ${email}
WhatsApp: ${phone}
Universitas: ${university}
Layanan: ${serviceLabel}

Detail:
${message}

Saya tertarik untuk konsultasi lebih lanjut!`;

      const waLink = `https://wa.me/6289691789422?text=${encodeURIComponent(text)}`;
      window.open(waLink, "_blank");
    });
  }
});

// ==========================================
// COMPARISON CARDS - Horizontal Scroll Dots
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".comparison-cards-wrapper");
  const cards = document.querySelectorAll(".comparison-card");
  const dots = document.querySelectorAll(".dot");

  if (!wrapper || !cards.length || !dots.length) return;

  // Update active dot on scroll
  function updateActiveDot() {
    const scrollLeft = wrapper.scrollLeft;
    const cardWidth = cards[0].offsetWidth;
    const currentIndex = Math.round(scrollLeft / cardWidth);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Event listener for scroll
  wrapper.addEventListener("scroll", updateActiveDot);

  // Event listener for dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const cardWidth = cards[0].offsetWidth;
      wrapper.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    });
  });

  // Initial update
  updateActiveDot();
});