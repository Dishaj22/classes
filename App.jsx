// import { BrowserRouter, Link, Outlet, Route, Routes, useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import "./App.css";

// const fallbackRecipes = [
//   { id: 1, name: "Spaghetti Carbonara" },
//   { id: 2, name: "Chicken Biryani" },
//   { id: 3, name: "Berry Pancakes" }
// ];

// function Layout() {
//   return (
//     <div className="app-shell">
//       <nav className="top-nav">
//         <h2>Recipe</h2>
//         <div className="nav-links">
//           <Link to="/">Home</Link>
//         </div>
//       </nav>

//       <main className="content">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// function Home() {
//   const [recipes, setRecipes] = useState(fallbackRecipes);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     fetch("https://dummyjson.com/recipes?limit=3")
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data?.recipes) && data.recipes.length > 0) {
//           setRecipes(data.recipes.slice(0, 3));
//         }
//       })
//       .catch(() => {
//         setRecipes(fallbackRecipes);
//       });
//   }, []);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   return (
//     <div className="page-card">
//       <h1>Recipe List</h1>

//       <label className="search-label" htmlFor="recipe-search">
//         Search
//       </label>
//       <input
//         id="recipe-search"
//         ref={inputRef}
//         type="search"
//         placeholder="Search recipes..."
//         className="search-input"
//       />

//       <ul className="recipe-list">
//         {recipes.map((recipe) => (
//           <li key={recipe.id}>
//             <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function RecipeDetails() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);

//   useEffect(() => {
//     fetch(`https://dummyjson.com/recipes/${id}`)
//       .then((response) => response.json())
//       .then((data) => setRecipe(data))
//       .catch(() => {
//         setRecipe({
//           id,
//           name: "Recipe not found",
//           description: "The recipe details could not be loaded."
//         });
//       });
//   }, [id]);

//   if (!recipe) {
//     return <p>Loading recipe...</p>;
//   }

//   return (
//     <div className="page-card">
//       <h1>{recipe.name}</h1>
//       <p>
//         <strong>Recipe ID:</strong> {id}
//       </p>
//       <p>{recipe.description || "No description available."}</p>
//       <Link to="/" className="back-link">
//         ← Back to Home
//       </Link>
//     </div>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/recipes/:id" element={<RecipeDetails />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { useState } from "react";
// import PostList from "./PostList";

// function App() {
//   const [showPosts, setShowPosts] = useState(true);

//   return (
//     <div>
//       <h1>React Query Stale Time</h1>

//       <button onClick={() => setShowPosts(!showPosts)}>
//         {showPosts ? "Hide Posts" : "Show Posts"}
//       </button>

//       {showPosts && <PostList />}
//     </div>
//   );
// }

// export default App;

// import CryptoTracker from "./CryptoTracker";

// function App() {
//   return (
//     <div>
//       <CryptoTracker />
//     </div>
//   );
// }

// export default App;

import TodoList from "./TodoList";

function App() {
  return (
    <div>
      <h1>My Todo App</h1>
      <TodoList />
    </div>
  );
}

export default App;


