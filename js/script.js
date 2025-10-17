// Menu Mobile
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })
}

// Newsletter Form
const newsletterForm = document.getElementById("newsletterForm")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = newsletterForm.querySelector('input[type="email"]').value

    try {
      const response = await fetch("newsletter.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}`,
      })

      const data = await response.json()

      if (data.success) {
        alert("Inscrição realizada com sucesso!")
        newsletterForm.reset()
      } else {
        alert(data.message || "Erro ao realizar inscrição.")
      }
    } catch (error) {
      alert("Erro ao processar sua solicitação.")
    }
  })
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animação ao scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Aplicar animação aos cards
document.querySelectorAll(".card, .tool-card, .event-card, .step").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})
