/**
 * Page de contact avec un formulaire
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Contact = (element) => {
  element.innerHTML = `
    <div class="container mt-5">
      <h1 class="text-center">Contactez-nous</h1>
      <div class="form-container">
        <form id="contact-form">
          <div class="mb-3">
            <label for="clientName" class="form-label">Nom</label>
            <input type="text" class="form-control" id="clientName" required>
          </div>
          <div class="mb-3">
            <label for="clientEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="clientEmail" required>
          </div>
          <div class="mb-3">
            <label for="clientSubject" class="form-label">Sujet</label>
            <input type="text" class="form-control" id="clientSubject" required>
          </div>
          <div class="mb-3">
            <label for="clientMessage" class="form-label">Message</label>
            <textarea class="form-control" id="clientMessage" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-lg mt-3">Envoyer</button>
        </form>
      </div>
    </div>
  `;

  const style = `
    .form-container {
      max-width: 50%; /* Réduit la largeur à 50% */
      margin: 0 auto; /* Centre le formulaire */
    }
    .text-center {
      text-align: center; /* Centre le texte du titre */
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);

  // Gestionnaire d'événements pour le formulaire
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const clientName = document.getElementById("clientName").value;
    const clientEmail = document.getElementById("clientEmail").value;
    const clientSubject = document.getElementById("clientSubject").value;
    const clientMessage = document.getElementById("clientMessage").value;

    const contactData = {
      nom: clientName,
      email: clientEmail,
      sujet: clientSubject,
      message: clientMessage,
    };

    // Fonction pour traiter l'envoi des données
    sendContactForm(contactData);
  });

  const sendContactForm = (contactData) => {
    console.log("Données du formulaire de contact :", contactData);

    element.innerHTML += `
      <div class="alert alert-success mt-4" role="alert">
        Votre message a été envoyé avec succès. Merci de nous avoir contactés !
      </div>
    `;

    // Réinitialiser le formulaire
    document.getElementById("contact-form").reset();
  };
};
