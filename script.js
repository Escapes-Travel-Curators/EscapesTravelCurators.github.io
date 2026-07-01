const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobilePanel = document.querySelector(".mobile-panel");
const closeMenu = document.querySelector(".close-menu");
const mobileLinks = document.querySelectorAll(".mobile-panel a");
const revealItems = document.querySelectorAll(".reveal");
const form = document.querySelector("#inquiry-form");
const formStatus = document.querySelector(".form-status");

function setMenu(open) {
  mobilePanel.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
}

menuToggle?.addEventListener("click", () => setMenu(true));
closeMenu?.addEventListener("click", () => setMenu(false));
mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll("details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll("details[open]").forEach((openItem) => {
      if (openItem !== item) openItem.open = false;
    });
  });
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button");
  const data = {
    name: form.elements.name.value,
    email: form.elements.email.value,
    description: form.elements.message.value,
  };

  formStatus.textContent = "Sending your travel brief...";
  submitButton.disabled = true;

  try {
    const response = await fetch("https://formspree.io/f/xanorwal", {
      body: JSON.stringify(data),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) throw new Error("Form submission failed");

    form.reset();
    formStatus.textContent = "Inquiry sent. We will contact you soon.";
  } catch (error) {
    formStatus.textContent = "Could not send right now. Please WhatsApp or call us.";
  } finally {
    submitButton.disabled = false;
  }
});
