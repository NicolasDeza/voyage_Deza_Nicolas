import { Layout } from "../layouts/Layout";
import { Nav } from "../layouts/Nav";

export const ROUTE_CHANGED_EVENT = "route-changed";

/**
 *
 * @param {string} elementId
 * @param {Object.<string, Function>} routes
 * @returns {void}
 */
export const app = (elementId, routes) => {
  const appElement = document.querySelector(elementId);

  // On injecte le layout dans la div principale de l'application
  appElement.innerHTML = Layout();

  const headerElement = document.querySelector("header");
  const mainElement = document.querySelector("main");

  // On injecte la barre de navigation dans le header
  Nav(headerElement);

  /**
   * Fonction qui remplace le contenu de la page lorsqu'on change de route
   * @returns {void}
   */
  const changePage = () => {
    const page = routes[currentRoute];

    // Si la route n'existe pas, on affiche la page 404
    if (!page) {
      NotFound(mainElement);
      return;
    }

    page(mainElement);
  };

  // On initialise la page courante en récupérant le pathname de l'URL
  let currentRoute = window.location.pathname;
  changePage(currentRoute);

  // On écoute l'événement personnalisé route-changed pour changer de page
  headerElement.addEventListener(ROUTE_CHANGED_EVENT, () => {
    const newRoute = window.location.pathname;
    // On change de page uniquement si la route a changé
    if (currentRoute !== newRoute) {
      currentRoute = newRoute;
      changePage(currentRoute);
    }
  });

  // Ajout d'un écouteur pour gérer les boutons "Retour" et "Avancer" du navigateur
  window.addEventListener("popstate", () => {
    currentRoute = window.location.pathname;
    changePage(currentRoute);
  });

  // Mise en place des liens internes pour fonctionner avec l'historique
  const setupLinkNavigation = () => {
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetRoute = event.target.getAttribute("href");
        if (targetRoute && targetRoute !== currentRoute) {
          window.history.pushState({}, "", targetRoute);
          headerElement.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
        }
      });
    });
  };

  // On appelle cette fonction après le premier rendu
  setupLinkNavigation();
};
