import { ROUTE_CHANGED_EVENT } from "../framework/app";

export const Nav = (element) => {
  const appName = "VoyageZen";

  const links = [
    { href: "/", text: "Accueil" },
    { href: "/voyages", text: "Voyages" },
    { href: "/contact", text: "Contact" },
    { href: "/panier", text: "Reservation" },
  ];

  element.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">${appName}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            ${links
              .map(
                (link) => `
              <li class="nav-item">
                <a class="nav-link ${
                  window.location.pathname === link.href ? "active" : ""
                }" href="${link.href}">${link.text}</a>
              </li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Remplace les liens par des événements de navigation
  const navLinks = element.querySelectorAll("a");

  const linkClickHandler = (event) => {
    event.preventDefault(); // Empêche la navigation par défaut
    const newUrl = event.target.href;
    window.history.pushState({}, "", newUrl); // Modifie l'URL sans recharger la page
    element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT)); // Déclenche l'événement de changement de route
    updateActiveLink();
    updatePageTitle();
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", linkClickHandler);
  });

  const updateActiveLink = () => {
    navLinks.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  const updatePageTitle = () => {
    const activeLink = document.querySelector("a.nav-link.active");
    document.title = activeLink
      ? `${activeLink.textContent} - ${appName}`
      : appName;
  };

  // Gère les changements de route via le bouton Précédent/Suivant du navigateur
  window.addEventListener("popstate", () => {
    updateActiveLink();
    updatePageTitle();
    element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
  });

  // Initialisation
  updateActiveLink();
  updatePageTitle();
};
