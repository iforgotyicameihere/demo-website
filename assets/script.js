 (() => {
        const header = document.querySelector(".site-header");
        const headerH = header ? header.offsetHeight : 72;
        document.documentElement.style.setProperty(
          "--header-h",
          headerH + "px"
        );

        // Smooth scroll with offset fallback
        document
          .querySelectorAll('.top-navigation a[href^="#"]')
          .forEach((a) => {
            a.addEventListener("click", (e) => {
              const id = a.getAttribute("href").slice(1);
              const target = document.getElementById(id);
              if (!target) return;
              e.preventDefault();
              const y =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerH;
              window.scrollTo({ top: y, behavior: "smooth" });
            });
          });

        // Active link while scrolling
        const links = [
          ...document.querySelectorAll(".top-navigation a.nav-link"),
        ];
        const byHref = (id) =>
          links.find((l) => l.getAttribute("href") === `#${id}`);

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              links.forEach((l) => l.classList.remove("active"));
              const link = byHref(entry.target.id);
              if (link) link.classList.add("active");
            });
          },
          { threshold: 0.5, rootMargin: `-${headerH}px 0px -40% 0px` }
        );

        document
          .querySelectorAll("section[id]")
          .forEach((s) => observer.observe(s));
      })();
      // Select first element that matches
const nav = document.querySelector('.top-navigation');

// Select all that match (gives a NodeList)
const links = document.querySelectorAll('a');

// Loop through
links.forEach(link => {
  link.addEventListener('click', e => {
    console.log("clicked:", link.textContent);
  });
});

// Trigger the launch on page load (with 8s delay)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('is-loaded');
  }, 6000); // 3000ms = 3 seconds
});


// (Optional) collapse the empty space after the image flies away
const logoImg = document.querySelector('.logo img');
if (logoImg) {
  logoImg.addEventListener('animationend', () => {
    logoImg.classList.add('gone');
  });
  logoImg.addEventListener('animationstart', () => {
    new Audio('assets/sfx/ufo-whoosh.mp3').play();
  });
}
window.addEventListener('scroll', () => {
  if (window.scrollY === 0 && logoImg) {
    logoImg.classList.remove('gone');
    // Reset animation to allow replay
    logoImg.style.animation = 'none';
    void logoImg.offsetWidth; // Force reflow
    logoImg.style.animation = 'flyAway 6s ease-out forwards';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    /* Fullscreen intro overlay */
    #intro {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #0de03be7;
      overflow: hidden;
      opacity: 1;
      transition: opacity 4s ease;
    }
    /* Logo */
    #intro .intro-logo {
      max-width: 200px;
      display: none;
      z-index: 2;
      opacity: 1;
      transition: opacity 2s ease;
    }
    /* Video behind the logo */
    #intro .intro-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.7);
      z-index: 1;
    }
    /* Site content starts hidden */
    body #site-content {
      opacity: 0;
      transition: opacity 4s ease;
    }
    /* Loaded state */
    body.loaded #intro {
      opacity: 0;
      pointer-events: none;
    }
    body.loaded #site-content {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // 2. Wrap all existing content inside #site-content
  const siteContent = document.createElement('div');
  siteContent.id = 'site-content';
  while (document.body.firstChild) {
    siteContent.appendChild(document.body.firstChild);
  }
  document.body.appendChild(siteContent);

  // 3. Create the intro overlay
  const intro = document.createElement('div');
  intro.id = 'intro';
  intro.innerHTML = `
    <img src="assets/logo.png" alt="UFO Websites Logo" class="intro-logo">
    <video class="intro-video" autoplay muted loop playsinline>
      <source src="assets/fly.mp4" type="video/mp4">
    </video>
  `;
  document.body.appendChild(intro);

  // 4. After 3 seconds, fade to site
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 3000);
});

