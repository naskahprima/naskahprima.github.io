// new
document.addEventListener('DOMContentLoaded', function() {
  const disabledButtons = document.getElementsByClassName('disabled-service');
  
  Array.from(disabledButtons).forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      alert("Maaf, saat ini layanan yang Anda maksud sedang tidak bisa. Mohon lakukan pemesanan untuk layanan yang lain.");
    });
  });
});




// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Header background on scroll
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 15, 35, 0.95)";
  } else {
    header.style.background = "rgba(15, 15, 35, 0.9)";
  }
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    mobileMenuBtn.textContent = navLinks.classList.contains("show")
      ? "✕"
      : "☰";
  });

  // Close mobile menu when clicking on links
  navLinks.addEventListener("click", (e) => {
    if (
      e.target.tagName === "A" &&
      !e.target.classList.contains("btn-whatsapp")
    ) {
      navLinks.classList.remove("show");
      mobileMenuBtn.textContent = "☰";
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !mobileMenuBtn.contains(e.target) &&
      !navLinks.contains(e.target)
    ) {
      navLinks.classList.remove("show");
      mobileMenuBtn.textContent = "☰";
    }
  });
}

// Enhanced form submission with WhatsApp integration
document
  .getElementById("contactForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Create comprehensive WhatsApp message
    const message = `🎓 *KONSULTASI SKRIPSI INFORMATIKA*

      👤 *Data Mahasiswa:*
      • Nama: ${data.name}
      • Email: ${data.email}
      • WhatsApp: ${data.phone}
      • Universitas: ${data.university}

      🎯 *Layanan Diminta:*
      ${data.service}

      📝 *Detail Kebutuhan:*
      ${data.message}

      ---
      Saya tertarik untuk berkonsultasi lebih lanjut. Mohon informasi detail mengenai proses, timeline, dan biayanya.

      Terima kasih! 🙏`;

    const whatsappUrl = `https://wa.me/6289691789422?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Show success message
    alert(
      "✅ Terima kasih! Anda akan diarahkan ke WhatsApp untuk melanjutkan konsultasi dengan MSI."
    );

    // Reset form
    this.reset();
  });

// Add loading state management
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});



// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Category switching
  const categoryBtns = document.querySelectorAll('.category-btn');
  const faqCategories = document.querySelectorAll('.faq-category');
  
  if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetCategory = this.getAttribute('data-category');
        
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Hide all categories
        faqCategories.forEach(cat => cat.classList.remove('active'));
        // Show target category
        const targetElement = document.getElementById(targetCategory);
        if (targetElement) {
          targetElement.classList.add('active');
        }
      });
    });
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items in the same category
        const currentCategory = item.closest('.faq-category');
        if (currentCategory) {
          currentCategory.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
          });
        }
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Add hover effects to FAQ questions
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(5px)';
    });
    
    question.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
});