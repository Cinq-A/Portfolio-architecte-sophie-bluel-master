


const ajouter_work = document.getElementById("ajouter_work_id");
const dialogModifier2 = document.getElementById("dialog_Modifier");

const ferme_div_ajouter = document.getElementById("ferme_div_ajouter");
const btn_ajouter= document.getElementById("btn_ajouter");
const btn_retour= document.getElementById("retour");




btn_ajouter.addEventListener("click", () => {
    console.log("ajouter la classe pour cacher la boîte de dialogue2")
    dialogModifier2.classList.add("fermer_ouvrir_fiche_modification"); 
    ajouter_work.classList.remove("fermer_ouvrir_fiche_modification"); 

});


ferme_div_ajouter.addEventListener("click", () => {
    console.log("ajouter la classe pour cacher la boîte de dialogue2")
    dialogModifier2.classList.add("fermer_ouvrir_fiche_modification"); 
    ajouter_work.classList.add("fermer_ouvrir_fiche_modification"); 

});

btn_retour.addEventListener("click", () => {
    console.log("ajouter la classe pour cacher la boîte de dialogue2")
    dialogModifier2.classList.remove("fermer_ouvrir_fiche_modification"); 
    ajouter_work.classList.add("fermer_ouvrir_fiche_modification"); 

});




// Récupérer les éléments HTML
// const ajouterPhotoBtn = document.getElementById('ajouterPhotoBtn');
const photoInput = document.getElementById('photoInput');

// Lorsque le bouton est cliqué, déclencher le clic de l'input de type file


photoInput.addEventListener('change', () => {
    
    console.log("photoInput a changé!")
    const selectedFile = photoInput.files[0];
    if (selectedFile) {
        console.log('Fichier sélectionné :', selectedFile);
        // const filePath = selectedFile.files[0].name; 
        // console.log('Nom du fichier et chemin :', filePath);
        // Vérifier le type de fichier et la taille
        const validExtensions = ['.jpg', '.jpeg', '.png'];
        const fileSizeLimit = 4 * 1024 * 1024; // 4 Mo en octets
        
        console.log('Nom du fichier :', selectedFile.name);

        const isValidExtension = validExtensions.some(ext => selectedFile.name.toLowerCase().endsWith(ext));
        const isSizeValid = selectedFile.size <= fileSizeLimit;

        console.log('Extension valide ?', isValidExtension);
        console.log('Taille valide ?', isSizeValid);

        if (!isValidExtension) {
            alert("Veuillez sélectionner un fichier JPG ou PNG.");
            photoInput.value = ''; // Réinitialiser l'input
        } else if (!isSizeValid) {
            alert("La taille du fichier dépasse 4 Mo.");
            photoInput.value = ''; // Réinitialiser l'input
        } else {
            console.log('Le fichier est valide.');
            // Fichier valide, le traitement...
            
  
            const reader = new FileReader();
          
            reader.onload = function(event) {
              const imgElement = document.createElement('img');
              imgElement.src = event.target.result;
              const img_new_work = document.querySelector(".visu_img");
              img_new_work.appendChild(imgElement); // Ajouter l'image à la page
            };
          
            reader.readAsDataURL(selectedFile);
            // const imageURL = URL.createObjectURL(selectedFile);
            // console.log('URL de l\'image sélectionnée:', imageURL);


        }
    }
});


const btn_formulaire_ajouter = document.querySelector(".btn_valider_work");
btn_formulaire_ajouter.addEventListener("click", function (event) {
  event.preventDefault();

  const titre= document.getElementById("titre").value;
  const categorie = document.getElementById("categorie").value;

  // Sélectionnez le fichier à partir de l'input file
const inputFile = document.getElementById('photoInput');

const token=window.localStorage.getItem("token");
console.log("le miens = "+token);
  const selectedFile = photoInput.files[0];

  // Créez un nouvel objet FormData
  const formData = new FormData();

  // Ajoutez le fichier image
  formData.append('image', selectedFile, selectedFile.name);

  // Ajoutez d'autres champs
  formData.append('title', titre);
  formData.append('category', categorie);

  // Effectuez la requête fetch
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+token,
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    localStorage.removeItem("works");
    alert("Votre travail a bien été ajouté !");
    window.location.reload(true);
    console.log('Réponse du serveur :', data);
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
  });


});

