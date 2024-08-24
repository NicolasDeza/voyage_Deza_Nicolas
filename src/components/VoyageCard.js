export const VoyageCard = (voyage) => {
  return `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${voyage.image}" class="card-img-top" alt="${voyage.nom}">
        <div class="card-body">
          <h5 class="card-title">${voyage.nom}</h5>
          <p class="card-text">${voyage.description.substring(0, 100)}...</p>
          <a href="/voyage?id=${
            voyage.id
          }" class="btn btn-primary">En savoir plus</a>
        </div>
      </div>
    </div>
  `;
};
