import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function Recipe() {
  const { id } = useParams();
  const location = useLocation();

  // Get query params (diet, mealType, ingredients)
  const queryParams = new URLSearchParams(location.search);
  const diet = queryParams.get('diet');
  const mealType = queryParams.get('mealType');
  const ingredients = queryParams.get('ingredients');

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: process.env.REACT_APP_API_KEY,
          diet,
          type: mealType,
          ingredients
        }
      });
      setRecipe(response.data);
    };
    fetchRecipe();
  }, [id, diet, mealType, ingredients]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.instructions}</p>
      <button>Save Recipe</button>
    </div>
  );
}

export default Recipe;
