export const Panier = (element) => {
  let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

  const renderReservations = () => {
    const reservationList = element.querySelector("#reservation-list");
    if (reservations.length === 0) {
      reservationList.innerHTML = `<tr><td colspan="5" class="text-center">Votre panier est vide.</td></tr>`;
      return;
    }

    reservationList.innerHTML = reservations
      .map(
        (reservation, index) => `
        <tr>
          <td>${reservation.voyageNom}</td>
          <td>Du ${reservation.dateDepart} au ${reservation.dateRetour}</td>
          <td>${reservation.statut}</td>
          <td>${reservation.dateReservation}</td>
          <td>
            <button class="btn btn-danger btn-sm" data-index="${index}">Supprimer</button>
          </td>
        </tr>
      `
      )
      .join("");

    reservationList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        removeReservation(button.dataset.index);
      });
    });
  };

  const removeReservation = (index) => {
    reservations.splice(index, 1);
    saveReservations();
    renderReservations();
  };

  const saveReservations = () => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  };

  element.innerHTML = `
    <div class="container mt-5">
      <h1>Votre Panier</h1>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Voyage</th>
              <th scope="col">Dates</th>
              <th scope="col">Statut</th>
              <th scope="col">Date de Réservation</th>
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

  element.querySelector("#confirm-button").addEventListener("click", () => {
    confirmReservations();
  });

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

  renderReservations();
};
