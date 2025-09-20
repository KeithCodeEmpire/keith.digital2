const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content'); // Only on pages with loader
const footer = document.querySelector('.footer');

document.addEventListener('DOMContentLoaded', () => {
  if (loader && mainContent) {
    // Page has loader, run loader sequence
    mainContent.style.display = 'none'; // hide main content initially

    const loaderDuration = 2800; // adjust if needed
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      mainContent.style.display = 'block';
      document.body.classList.add('nav-line-animate');

      setTimeout(() => {
        loader.remove();

        if (footer) {
          const observer = new IntersectionObserver(
            ([entry], observerInstance) => {
              if (entry.isIntersecting) {
                footer.classList.add('animate-border');
                observerInstance.unobserve(entry.target);
              }
            },
            { root: null, threshold: 0.1 }
          );
          observer.observe(footer);
        }
      }, 600);
    }, loaderDuration);

  } else {
    // No loader: just show main content and animate nav/footer immediately
    if (mainContent) mainContent.style.display = 'block'; // if it exists

    document.body.classList.add('nav-line-animate');

    if (footer) {
      const observer = new IntersectionObserver(
        ([entry], observerInstance) => {
          if (entry.isIntersecting) {
            footer.classList.add('animate-border');
            observerInstance.unobserve(entry.target);
          }
        },
        { root: null, threshold: 0.1 }
      );
      observer.observe(footer);
    }
  }
});

// Nav toggle button
navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

// Close nav on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});