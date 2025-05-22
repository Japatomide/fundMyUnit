// Hamburger Menu 
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");

hamburgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburgerMenu.classList.toggle("open");
});

// FAQ toggle
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.closest(".faq-item");
      faqItem.classList.toggle("active");

      // Optional: Close other open FAQ items
      faqQuestions.forEach((otherQuestion) => {
        const otherFaqItem = otherQuestion.closest(".faq-item");
        if (
          otherFaqItem !== faqItem &&
          otherFaqItem.classList.contains("active")
        ) {
          otherFaqItem.classList.remove("active");
        }
      });
    });
  });
});