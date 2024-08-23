import voyages from "../storage/voyages.json";

/**
 * Page des détails d'un voyage
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Voyage = (element) => {
  const url = new URL(window.location.href);
  const voyageId = parseInt(url.searchParams.get("id"));
  const voyage = voyages.find((v) => v.id === voyageId);

  if (!voyage) {
    element.innerHTML = `
      <div class="container mt-5">
        <div class="alert alert-danger" role="alert">
          Voyage non trouvé. L'identifiant ${voyageId} ne correspond à aucun voyage.
        </div>
      </div>
    `;
    return;
  }

  element.innerHTML = `
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <img src="${voyage.image}" class="img-fluid rounded mb-4" alt="${
    voyage.nom
  }">
        </div>
        <div class="col-md-6">
          <h1>${voyage.nom}</h1>
          <p><strong>Destinations :</strong> ${voyage.destinations.join(
            ", "
          )}</p>
          <p><strong>Dates :</strong> Du ${voyage.depart} au ${
    voyage.retour
  }</p>
          <p><strong>Budget :</strong> ${voyage.budget}€</p>
          <p>${voyage.description}</p>
          <form id="reservation-form">
            <div class="mb-3">
              <label for="clientName" class="form-label">Nom</label>
              <input type="text" class="form-control" id="clientName" required>
            </div>
            <div class="mb-3">
              <label for="clientSurname" class="form-label">Prénom</label>
              <input type="text" class="form-control" id="clientSurname" required>
            </div>
            <div class="mb-3">
              <label for="clientEmail" class="form-label">Email</label>
              <input type="email" class="form-control" id="clientEmail" required>
            </div>
            <div class="mb-3">
              <label for="clientPhone" class="form-label">Numéro de téléphone</label>
              <input type="tel" class="form-control" id="clientPhone" required>
            </div>
            <button type="submit" class="btn btn-primary btn-lg mt-3">Réserver ce voyage</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document
    .getElementById("reservation-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const clientName = document.getElementById("clientName").value;
      const clientSurname = document.getElementById("clientSurname").value;
      const clientEmail = document.getElementById("clientEmail").value;
      const clientPhone = document.getElementById("clientPhone").value;

      const client = {
        nom: clientName,
        prenom: clientSurname,
        email: clientEmail,
        telephone: clientPhone,
      };
      addReservation(voyage, client);
    });

  const addReservation = (voyage, client) => {
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const reservation = {
      client,
      voyageNom: voyage.nom,
      voyageId: voyage.id,
      date: new Date().toLocaleDateString(),
      statut: "En attente",
    };
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // Redirection vers la page du panier après confirmation de la réservation
    window.location.href = "/panier";
  };
};
