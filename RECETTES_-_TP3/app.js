fetch('https://dummyjson.com/recipes?limit=50')
  .then(response => response.json())
  .then(data => {
    // Affichage de l'image de fond
    const banner = document.getElementById('banner');
    banner.style.backgroundImage = `url(images/bg-image.png)`;

    // Affichage des recettes sous forme de cartes
    const recipeCards = document.getElementById('recipe-cards');
    data.recipes.forEach((recipe, index) => {
      const card = document.createElement('div');
      card.classList.add('col-12', 'col-md-6', 'px-0');
      /* J'ai omis l'affichage de l'ID dans le site car j'estimais que l'utilisateur n'en avait pas besoin vu que mon tri n'est pas focntionnel
      <p class="card-text">
      ID: ${recipe.id}
      </p> ***/

      // Affichage des icônes en fonction de la vitesse de préparation et de cuisson
      let prepTimeIcon = '';
      let cookTimeIcon = '';

      if (recipe.prepTimeMinutes <= 15) {
        prepTimeIcon = '<i class="bi bi-lightning-fill text-warning"></i>';
      } else if (recipe.prepTimeMinutes <= 30) {
        prepTimeIcon = '<i class="bi bi-clock-fill text-warning"></i>';
      } else {
        prepTimeIcon = '<i class="bi bi-hourglass-bottom text-warning"></i>';
      }

      if (recipe.cookTimeMinutes <= 15) {
        cookTimeIcon = '<i class="bi bi-lightning-fill text-warning"></i>';
      } else if (recipe.cookTimeMinutes <= 30) {
        cookTimeIcon = '<i class="bi bi-clock-fill text-warning"></i>';
      } else {
        cookTimeIcon = '<i class="bi bi-hourglass-bottom text-warning"></i>';
      }
      
      card.innerHTML = `
        <div class="card h-100">
          <img src="${recipe.image}" class="card-img-top card-image" alt="${recipe.name}">
          <div class="card-body">
            <h5 class="card-title">${recipe.name}</h5>
            <p class="card-text">
              <i class="bi bi-star-fill"></i> Rating: ${recipe.rating}
            </p>
            <p class="card-text">
              Prepa Time: ${prepTimeIcon} ${recipe.prepTimeMinutes} min - Cook Time: ${cookTimeIcon} ${recipe.cookTimeMinutes} min
            </p>
            <p class="card-text">
              <span class="badge ${recipe.difficulty === 'Easy' ? 'difficulty-easy' : recipe.difficulty === 'Medium' ? 'difficulty-medium' : 'difficulty-hard'}">${recipe.difficulty}</span>
            </p>
            <a href="#" class="btn btn-primary" data-recipe-id="${recipe.id}">Details</a>
          </div>
        </div>
      `;

      if (index % 2 === 0) {
        const section = document.createElement('section');
        section.classList.add('mb-5');
        const container = document.createElement('div');
        container.classList.add('container');
        const row = document.createElement('div');
        row.classList.add('row', 'my-5');
        row.appendChild(card);
        recipeCards.appendChild(row);
      } else {
        recipeCards.lastChild.appendChild(card);
      }

      // Ajout de l'événement de clic sur le bouton "Details"
      const detailsButton = card.querySelector('.btn-primary');
      detailsButton.addEventListener('click', () => {
        // Rediriger l'utilisateur vers la page de détails avec l'ID de la recette
        window.location.href = `details.html?recipeId=${recipe.id}`;
      });
    });

    // Affichage des recettes dans le tableau
    const recipeTable = document.getElementById('recipe-table');
    
    data.recipes.forEach(recipe => {
      const row = document.createElement('tr');

      /* Affichage des icônes en fonction de la vitesse de préparation et de cuisson
      let prepTimeIcon = '';
      let cookTimeIcon = '';

      if (recipe.prepTimeMinutes <= 15) {
        prepTimeIcon = '<i class="bi bi-lightning-fill text-warning"></i>';
      } else if (recipe.prepTimeMinutes <= 30) {
        prepTimeIcon = '<i class="bi bi-clock-fill text-warning"></i>';
      } else {
        prepTimeIcon = '<i class="bi bi-hourglass-bottom text-warning"></i>';
      }

      if (recipe.cookTimeMinutes <= 15) {
        cookTimeIcon = '<i class="bi bi-lightning-fill text-warning"></i>';
      } else if (recipe.cookTimeMinutes <= 30) {
        cookTimeIcon = '<i class="bi bi-clock-fill text-warning"></i>';
      } else {
        cookTimeIcon = '<i class="bi bi-hourglass-bottom text-warning"></i>';
      } **/
      // J'ai pas compris pourquoi mon tableau s'affichait deux fois le premier avec et le second sans icônes, 
      //je les ai donc retiré pour ce cas et j'ai ajouté les icones aux cartes
      
      row.innerHTML = `
        <td>${recipe.id}</td>
        <td>${recipe.name}</td>
        <td>${recipe.rating}</td>
        <td>${prepTimeIcon} ${recipe.prepTimeMinutes} min - ${cookTimeIcon} ${recipe.cookTimeMinutes} min</td>
        <td>
          <span class="badge ${recipe.difficulty === 'Easy' ? 'difficulty-easy' : recipe.difficulty === 'Medium' ? 'difficulty-medium' : 'difficulty-hard'}">${recipe.difficulty}</span>
        </td>
        <td><a href="#" class="btn btn-primary" data-recipe-id="${recipe.id}">Details</a></td>
      `;
      recipeTable.appendChild(row);

      // Ajout de l'événement de clic sur le bouton "Details"
      const detailsButton = row.querySelector('.btn-primary');
      detailsButton.addEventListener('click', () => {
        // Rediriger l'utilisateur vers la page de détails avec l'ID de la recette
        window.location.href = `details.html?recipeId=${recipe.id}`;
      });
    });

    // Bonus: essaie pour la recherche
    
  })
  .catch(error => console.error(error));