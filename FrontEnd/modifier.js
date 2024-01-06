// const boutton_modifier=document.getElementById("btn_modifier").style.visibility="hidden";

let token = window.localStorage.getItem("token");

if (token) {
  const loginLink = document.querySelector("#loginLink");
  const div_btn = document.querySelector(".div_modif");
  var bannier_mode_edition = document.getElementById("mode_edition");
  const boutton_modifier = document.createElement("p");
  const icone_modifier = document.createElement("i");
  boutton_modifier.setAttribute("id", "btn_modifier");

  icone_modifier.classList.add("fa-regular", "fa-pen-to-square");

  boutton_modifier.innerText = "modifier";

  div_btn.appendChild(icone_modifier);
  div_btn.appendChild(boutton_modifier);

  loginLink.innerText = "logout";
  bannier_mode_edition.style.display = "block";
  // console.log("vous etes connectes");
} else {
  loginLink.innerText = "login";
  // bannier_mode_edition.style.display="none";
  // console.log("vous n'etes pas connectes");
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("works");
}

const dialogModifier = document.getElementById("dialog_Modifier");
const fermeDivModif = document.getElementById("ferme_div_modif");
const btn_modifier = document.getElementById("btn_modifier");
fermeDivModif.addEventListener("click", () => {
  dialogModifier.classList.add("fermer_ouvrir_fiche_modification"); // ajouter la classe pour cacher la boîte de dialogue
});
if (btn_modifier != null) {
  btn_modifier.addEventListener("click", () => {
    dialogModifier.classList.remove("fermer_ouvrir_fiche_modification"); // Supprime la classe pour cacher la boîte de dialogue

    async function getworksforupdate() {
      // Récupération des pworks depuis l'API
      const reponse = await fetch("http://localhost:5678/api/works");
      let works = await reponse.json();
    }
    getworksforupdate();

    function genererWorkstoupdate(works) {
      const sectiondivGallery = document.querySelector(".div_modif_galerie");
      sectiondivGallery.innerHTML = "";
      for (let i = 0; i < works.length; i++) {
        const work = works[i];

        // Récupération de l'élément du DOM qui accueillera les figures

        // Création d’une balise dédiée à un work
        const gallerie_modif = document.createElement("div");
        gallerie_modif.classList.add("gallerie_modif");
        gallerie_modif.dataset.id = works[i].id;

        // Création des balises image et titre
        const work_image_modif = document.createElement("img");
        work_image_modif.src = work.imageUrl;
        work_image_modif.alt = work.title;

        const para = document.createElement("p");
        const icone = document.createElement("i");
        icone.classList.add("fa-regular", "fa-trash-can");
        icone.dataset.id = works[i].id;

        gallerie_modif.appendChild(work_image_modif);
        gallerie_modif.appendChild(para);
        gallerie_modif.appendChild(icone);

        sectiondivGallery.appendChild(gallerie_modif);

        icone.addEventListener("click", async function (e) {
          e.preventDefault();
          const id = e.target.getAttribute("data-id");
          // console.log(id);

          try {
            const response = await fetch(
              `http://localhost:5678/api/works/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            );
            // console.log(token);
            if (!response.ok) {
              throw new Error("Erreur lors de la suppression");
            }

            alert("Suppression réussie");
            window.localStorage.removeItem("works");

            const node = document.querySelector(`div[data-id="${id}"]`);
            if (node.parentNode) {
              node.parentNode.removeChild(node);
            }

            const nodeaccueil = document.querySelector(
              `figure[data-id="${id}"]`
            );
            if (nodeaccueil.parentNode) {
              nodeaccueil.parentNode.removeChild(nodeaccueil);
            }
          
          } catch (error) {
            console.error(error);
            alert("Erreur lors de la suppression");
          }
        });
      }
    }

    genererWorkstoupdate(works);
  });
}
