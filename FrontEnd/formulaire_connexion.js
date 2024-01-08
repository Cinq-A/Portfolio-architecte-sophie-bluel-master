const loginLink = document.querySelector("#loginLink");
const loginDialog = document.querySelector("#loginDialog");

loginLink.addEventListener("click", () => {
  if (loginLink.innerText == "login") {
    loginDialog.show(); // Ouvre la boîte de dialogue
  } else {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    location.reload();
  }
});

loginDialog.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    loginDialog.close(); // Ferme la boîte de dialogue lorsque la touche Escape est enfoncée
  }
});

const formulaireConnexion = document.querySelector("#loginDialog");
formulaireConnexion.addEventListener("submit", function (event) {
  event.preventDefault();

  const mail_saisi = document.getElementById("email_user").value;
  const mdp_saisi = document.getElementById("password").value;

  // console.log(mail_saisi);
  // console.log(mdp_saisi);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",

    body: JSON.stringify({
      email: mail_saisi,
      password: mdp_saisi,
    }),

    headers: { "Content-Type": "application/json" },
  })
    .then((Response) => Response.json())

    .then((data) => {
      if (data.userId) {
        window.localStorage.setItem("userId", data.userId);
        window.localStorage.setItem("token", data.token);

        loginDialog.close();

        window.location.href = "index.html";
        window.location.reload(true);
      } else {
        const MsgErrorConnexion = document.getElementById("msg-error-connexion");
        MsgErrorConnexion.innerText="Erreur dans l’identifiant ou le mot de passe !"
        MsgErrorConnexion.style.display = "block";

        // alert("Erreur dans l’identifiant ou le mot de passe");
      }
    });
});
