export const VoyageCard = (voyage) => {
  return `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${voyage.image}" class="card-img-top" alt="${voyage.nom}">
          <div class="card-body">
            <h5 class="card-title">${voyage.nom}</h5>
            <p class="card-text">${voyage.description}</p>
            <p class="card-text"><strong>Prix: ${voyage.budget}€</strong></p>
            <a href="/voyage/${voyage.nom.toLowerCase()}" class="btn btn-primary">En savoir plus</a>
          </div>
        </div>
      </div>
    `;
};
