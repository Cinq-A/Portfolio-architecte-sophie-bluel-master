//Récupération des works eventuellement stockées dans le localStorage
// window.localStorage.removeItem("works");
let works = window.localStorage.getItem("works");

if (works === null) {
  async function getworks() {
    // Récupération des pworks depuis l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    let works = await reponse.json();

    // Transformation des works en JSON
    const valeurWorks = JSON.stringify(works);

    // Stockage des works dans le localStorage
    window.localStorage.setItem("works", valeurWorks);
    window.location.reload(true);
  }
  getworks();
} else {
  works = JSON.parse(works);
}

if (works != null) {
  function genererWorks(works) {
    for (let i = 0; i < works.length; i++) {
      //iciiiiiiiiiiiiiiiiiiiiiiiiii
      let work = works[i];

      // Récupération de l'élément du DOM qui accueillera les figures
      const sectionGallery = document.querySelector(".gallery");

      // Création d’une balise dédiée à un work
      const work_figure = document.createElement("figure");
      work_figure.dataset.id = works[i].id;

      // Création des balises image et titre
      const work_image = document.createElement("img");
      work_image.src = work.imageUrl;
      work_image.alt = work.title;
      const work_nom = document.createElement("figcaption");
      work_nom.innerText = work.title;

      // On rattache les balises: (img et figcaption) à la la balise figure
      work_figure.appendChild(work_image);
      work_figure.appendChild(work_nom);

      // On rattache la balise: workfigure à la la balise gallery
      sectionGallery.appendChild(work_figure);
    }
  }

  genererWorks(works);
}

//***********filtrage*************** */

// filtrage par catgorie : Objet.

const btn_filtre_Objets = document.querySelector(".btn_filtre_Objets");

btn_filtre_Objets.addEventListener("click", function () {
  const Works_objets = works.filter(function (work) {
    return work.categoryId == 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(Works_objets);
});

// filtrage par catgorie : Appartement.

const btn_filtre_Appartements = document.querySelector(
  ".btn_filtre_Appartements"
);

btn_filtre_Appartements.addEventListener("click", function () {
  const Works_appartement = works.filter(function (work) {
    return work.categoryId == 2;
  });
  const btn_filtre_Tous = document.querySelector(".btn_filtre_Tous");
  btn_filtre_Tous.classList.remove("categorie_selectionnee");
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(Works_appartement);
});

// filtrage par catgorie : Hôtels & restaurants.

const btn_filtre_Hotels_Resto = document.querySelector(
  ".btn_filtre_Hotels_Resto"
);

btn_filtre_Hotels_Resto.addEventListener("click", function () {
  const Works_Hotels_Resto = works.filter(function (work) {
    return work.categoryId == 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(Works_Hotels_Resto);
});

// affichage de tous les Works.

const btn_filtre_Tous = document.querySelector(".btn_filtre_Tous");

btn_filtre_Tous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";

  genererWorks(works);
});
