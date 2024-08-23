import { ROUTE_CHANGED_EVENT } from "../framework/app";

export const DataTable = (
  element,
  items,
  itemTemplate,
  searchableFields,
  tableHeadings
) => {
  let currentPage =
    parseInt(new URL(window.location).searchParams.get("page")) || 1;
  let searchInputValue =
    new URL(window.location).searchParams.get("search") || "";
  let filteredItems = items;

  const id = `table-${Math.random().toString(36).slice(2)}`;

  element.innerHTML = `
    <div class="row">
      <div class="col mb-2">
        <!-- La barre de recherche sera automatiquement injectée ici -->
      </div>
    </div>
    <div class="row">
      <div id="${id}" class="col-12">
        <!-- Les voyages seront affichés ici -->
      </div>
    </div>
    <div id="pagination" class="d-flex justify-content-center"></div>
  `;

  const searchInput = element.querySelector("input#search");
  const listElement = element.querySelector(`#${id}`);
  const paginationElement = element.querySelector("#pagination");

  const renderList = (filteredItems) => {
    if (filteredItems.length === 0) {
      return `<p class="text-center">Aucun résultat trouvé.</p>`;
    }

    return filteredItems.map(itemTemplate).join("");
  };

  const filterAndPaginate = (perPage = 9) => {
    const value = searchInputValue.toLowerCase();
    if (value !== "") {
      filteredItems = items.filter(
        (item) =>
          searchableFields.filter((field) =>
            item[field].toLowerCase().includes(value)
          ).length > 0
      );
    } else {
      filteredItems = items;
    }

    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, filteredItems.length);
    const pages = Math.ceil(filteredItems.length / perPage);
    filteredItems = filteredItems.slice(start, end);

    listElement.innerHTML = renderList(filteredItems);
    // Remplacez `Pagination` par votre logique de pagination
    paginationElement.innerHTML = ""; // Ajoutez ici la logique de pagination

    // Event listener pour les liens de pagination
    paginationElement.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = parseInt(
          new URL(e.currentTarget.href).searchParams.get("page")
        );
        filterAndPaginate();
      });
    });
  };

  filterAndPaginate();

  searchInput.addEventListener("input", (e) => {
    searchInputValue = e.target.value;
    currentPage = 1;
    filterAndPaginate();
  });

  window.addEventListener("popstate", () => {
    currentPage =
      parseInt(new URL(window.location).searchParams.get("page")) || 1;
    filterAndPaginate();
  });
};
