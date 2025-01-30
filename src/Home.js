import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [preferences, setPreferences] = useState({
    mealType: '',
    diet: '',
    ingredients: ''
  });
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const fetchRecipes = async () => {
    const { mealType, diet, ingredients } = preferences;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        diet,
        type: mealType,
        ingredients,
        apiKey: 'YOUR_API_KEY'
      }
    });
    setRecipes(response.data.results);
  };

  return (
    <div>
      <h1>Welcome to FlavorFuse</h1>
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients you have"
        onChange={handleInputChange}
      />
      <select name="diet" onChange={handleInputChange}>
        <option value="">Select Diet</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="glutenFree">Gluten-Free</option>
      </select>
      <select name="mealType" onChange={handleInputChange}>
        <option value="">Select Meal Type</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <button onClick={fetchRecipes}>Get Recipes</button>

      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <button>Save Recipe</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
