import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
