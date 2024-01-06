
async function getCategorie(){
const reponse = await fetch("http://localhost:5678/api/categories");
let categories = await reponse.json();
const valeurCategorie = JSON.stringify(categories);
// Stockage des informations dans le localStorage
window.localStorage.setItem("categorie", valeurCategorie);
}
getCategorie();