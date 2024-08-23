import { Layout } from "../layouts/Layout";
import { Nav } from "../layouts/Nav";
// import { NotFound } from "../pages/404";

export const ROUTE_CHANGED_EVENT = "route-changed";

export const app = (elementId, routes) => {
  const appElement = document.querySelector(elementId);

  // Injecte le layout dans l'application
  appElement.innerHTML = Layout();

  const headerElement = document.querySelector("header");
  const mainElement = document.querySelector("main");

  // Injecte la barre de navigation dans le header
  Nav(headerElement);

  const changePage = () => {
    const page = routes[window.location.pathname];

    // Si la route n'existe pas, affiche la page 404
    if (!page) {
      NotFound(mainElement);
      return;
    }

    page(mainElement);
  };

  // Initialiser la page courante
  let currentRoute = window.location.pathname;
  changePage(currentRoute);

  // Écouter les changements de route
  headerElement.addEventListener(ROUTE_CHANGED_EVENT, () => {
    const newRoute = window.location.pathname;
    if (currentRoute !== newRoute) {
      currentRoute = newRoute;
      changePage(currentRoute);
    }
  });

  const replaceLinksByEvents = () => {
    const navLinks = document.querySelectorAll("a");

    const linkClickHandler = (event) => {
      event.preventDefault(); // Empêche la navigation par défaut
      window.history.pushState({}, "", event.target.href); // Modifie l'URL de la page sans recharger
      appElement.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT)); // Déclenche l'événement custom
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", linkClickHandler);
    });
  };

  // Appelle cette fonction après la mise en place de l'application
  replaceLinksByEvents();
};
