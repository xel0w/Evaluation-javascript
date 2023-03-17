import axios from "axios";

document.querySelector(".form").addEventListener("submit", function (event) {
  // Empeche l'envoi du formulaire
  event.preventDefault();

  const nomInput = document.querySelector("#nomInput");
  const urlImageInput = document.querySelector("#urlInput");

  const nom = nomInput.value;
  const urlImage = urlImageInput.value;

  axios
    .post(
      "http://localhost:3000/characters",
      {
        displayName: nom,
        fullPortrait: urlImage,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(function (response) {
      console.log(response.data);
      alert("Les données ont été envoyées avec succès !");
      window.location.reload();
    })
    .catch(function (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'envoi des données.");
    });
});
