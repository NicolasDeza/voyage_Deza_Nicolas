import { VoyageCard } from "../components/VoyageCard";

export const Voyages = (element) => {
  const itemsPerPage = 9; // Nombre de voyages par page
  let currentPage = 1; // Page actuelle
  let voyages = []; // Stockage des voyages complets
  let searchBar; // Référence à la barre de recherche

  const fetchVoyages = () => {
    fetch("./src/storage/voyages.json")
      .then((response) => response.json())
      .then((data) => {
        voyages = data;
        initializeSearchBar(); // Initialiser la barre de recherche une fois
        renderVoyages(); // Rendu initial de la première page
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des voyages", error);
        element.innerHTML = `<p class="text-danger">Une erreur est survenue lors du chargement des voyages.</p>`;
      });
  };

  const initializeSearchBar = () => {
    searchBar = document.createElement("input");
    searchBar.setAttribute("type", "text");
    searchBar.setAttribute("placeholder", "Rechercher un voyage");
    searchBar.classList.add("form-control", "mb-4");

    searchBar.addEventListener("input", (e) => {
      currentPage = 1; // Réinitialiser à la première page lors de la recherche
      renderVoyages(); // Re-rendu avec la recherche appliquée
    });
  };

  const renderVoyages = () => {
    const query = searchBar.value.toLowerCase();
    const filteredVoyages = voyages.filter((voyage) =>
      voyage.nom.toLowerCase().includes(query)
    );

    const totalPages = Math.ceil(filteredVoyages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const voyagesToRender = filteredVoyages.slice(startIndex, endIndex);

    const voyagesHtml = voyagesToRender
      .map((voyage) => VoyageCard(voyage))
      .join("");

    element.innerHTML = `
      <div class="container my-5">
        <h1>Nos Voyages</h1>
        <div id="search-container"></div>
        <div class="row">
          ${voyagesHtml}
        </div>
        <nav>
          <ul class="pagination justify-content-center">
            ${createPaginationButtons(totalPages)}
          </ul>
        </nav>
      </div>
    `;

    const searchContainer = document.getElementById("search-container");
    searchContainer.appendChild(searchBar);

    // Utilisation de setTimeout pour remettre le focus sur la barre de recherche
    setTimeout(() => {
      searchBar.focus();
    }, 0);

    const paginationButtons = document.querySelectorAll(".pagination button");
    paginationButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const page = parseInt(e.target.dataset.page);
        if (page) {
          currentPage = page;
        } else if (e.target.dataset.action === "prev") {
          if (currentPage > 1) currentPage--;
        } else if (e.target.dataset.action === "next") {
          if (currentPage < totalPages) currentPage++;
        }
        renderVoyages(); // Re-rendu avec la nouvelle page
      });
    });
  };

  const createPaginationButtons = (totalPages) => {
    let buttonsHtml = `
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <button class="page-link" data-action="prev">Précédent</button>
      </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      buttonsHtml += `
        <li class="page-item ${i === currentPage ? "active" : ""}">
          <button class="page-link" data-page="${i}">${i}</button>
        </li>
      `;
    }

    buttonsHtml += `
      <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
        <button class="page-link" data-action="next">Suivant</button>
      </li>
    `;

    return buttonsHtml;
  };

  fetchVoyages(); // Chargement des voyages et rendu initial
};
