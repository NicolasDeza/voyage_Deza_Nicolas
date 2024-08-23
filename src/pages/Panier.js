// Panier.js
export const Panier = (element) => {
  // Récupérer les réservations depuis le LocalStorage
  let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

  // Fonction pour sauvegarder les réservations dans le LocalStorage
  const saveReservations = () => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  };

  // Fonction pour afficher les réservations dans le tableau
  const renderReservations = () => {
    const reservationList = element.querySelector("#reservation-list");
    if (reservations.length === 0) {
      reservationList.innerHTML = `<tr><td colspan="5" class="text-center">Votre panier est vide.</td></tr>`;
      return;
    }

    // Générer le contenu du tableau
    reservationList.innerHTML = reservations
      .map(
        (reservation, index) => `
      <tr>
        <td>${reservation.client.nom} ${reservation.client.prenom}</td>
        <td>${reservation.voyageNom}</td>
        <td>${reservation.date}</td>
        <td>${reservation.statut}</td>
        <td>
          <button class="btn btn-danger btn-sm" data-index="${index}">Supprimer</button>
        </td>
      </tr>
    `
      )
      .join("");

    // Ajouter un event listener à chaque bouton "Supprimer"
    reservationList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        removeReservation(button.dataset.index);
      });
    });
  };

  // Fonction pour supprimer une réservation
  const removeReservation = (index) => {
    reservations.splice(index, 1);
    saveReservations();
    renderReservations();
  };

  // Fonction pour confirmer les réservations
  const confirmReservations = () => {
    if (reservations.length === 0) {
      alert("Votre panier est vide.");
      return;
    }
    alert("Vos réservations ont été confirmées.");
    localStorage.removeItem("reservations");
    reservations = [];
    renderReservations();
  };

  // Injecter le HTML du panier dans l'élément donné
  element.innerHTML = `
    <div class="container mt-5">
      <h1>Votre Panier</h1>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Client</th>
              <th scope="col">Voyage</th>
              <th scope="col">Date</th>
              <th scope="col">Statut</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="reservation-list">
            <!-- Les réservations seront insérées ici -->
          </tbody>
        </table>
      </div>
      <div class="text-end mt-4">
        <button id="confirm-button" class="btn btn-success">Confirmer les Réservations</button>
      </div>
    </div>
  `;

  // Ajouter un event listener au bouton "Confirmer les Réservations"
  element
    .querySelector("#confirm-button")
    .addEventListener("click", confirmReservations);

  // Afficher les réservations au chargement de la page
  renderReservations();
};
