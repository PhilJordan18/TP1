const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('recipeId');

fetch(`https://dummyjson.com/recipes/${recipeId}`)
    .then(response => response.json())
    .then(recipe => {
        document.getElementById('rating').textContent = recipe.rating;
        document.getElementById('difficulty').textContent = recipe.difficulty;
        document.getElementById('name').textContent = recipe.name;
        document.getElementById('image').src = recipe.image;
        document.getElementById('image').alt = recipe.name;
        document.getElementById('ingredients').textContent = recipe.ingredients;
        document.getElementById('instructions').textContent = recipe.instructions;
        document.getElementById('serving').textContent = recipe.servings;
        document.getElementById('cuisine').textContent = recipe.cuisine;
        document.getElementById('caloriesPerServing').textContent = recipe.caloriesPerServing;
        document.getElementById('tags').textContent = recipe.tags.join(', ');
        document.getElementById('reviewCount').textContent = recipe.reviewCount;
        document.getElementById('mealType').textContent = recipe.mealType;

        console.log('recipeId:', recipeId);
    })
    .catch(error => console.error(error));


// Remplir le tableau avec les informations de toutes les recettes
fetch('https://dummyjson.com/recipes?limit=50')
    .then(response => response.json())
    .then(data => {
        const recipeTable = document.getElementById('recipe-table');

        data.recipes.forEach(recipe => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${recipe.id}</td>
        <td>${recipe.name}</td>
        <td>${recipe.rating}</td>
        <td>${recipe.prepTimeMinutes} min - ${recipe.cookTimeMinutes} min</td>
        <td>
          <span class="badge ${recipe.difficulty === 'Easy' ? 'difficulty-easy' : recipe.difficulty === 'Medium' ? 'difficulty-medium' : 'difficulty-hard'}">${recipe.difficulty}</span>
        </td>
        <td><a href="#" class="btn btn-primary" data-recipe-id="${recipe.id}">Details</a></td>
      `;
            recipeTable.appendChild(row);

            // Ajouter un événement de clic sur le bouton "Details"
            const detailsButton = row.querySelector('.btn-primary');
            detailsButton.addEventListener('click', () => {
                // Rediriger l'utilisateur vers la page de détails avec l'ID de la recette
                window.location.href = `details.html?recipeId=${recipe.id}`;
            });
        });
    });
