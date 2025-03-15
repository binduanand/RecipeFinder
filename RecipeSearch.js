import React, { useState } from "react";
import "./styles.css"; // Importing the CSS file

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  const fetchRecipe = async () => {
    if (!query.trim()) return;
    try {
      setError("");
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      if (data.meals) {
        setRecipe(data.meals[0]);
      } else {
        setRecipe(null);
        setError("No recipes found");
      }
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Food Recipe Finder</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter dish name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
        />
        <button onClick={fetchRecipe} className="button">
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {recipe && (
        <div className="card">
          <h2 className="recipe-title">{recipe.strMeal}</h2>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-image"
          />
          <h3>Ingredients:</h3>
          <ul className="ingredients-list">
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((i) => recipe[`strIngredient${i}`])
              .filter(Boolean)
              .map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
          </ul>
          <h3>Instructions:</h3>
          <p className="instructions">{recipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
