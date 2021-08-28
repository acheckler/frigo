import React, { useState, useEffect } from "react";
// import config from "../config";

function RecipeSuggestions() {
//   const [results, setResults] = useState([]);
const [results] = useState([]);

  const mapped = () => {
    return results.map((item) => {
      const itemData = item.recipe.label;
      return `${itemData}`;
    });
  };

  useEffect(() => {
    // const currentFood = JSON.parse(localStorage.getItem("selectedFood")) || [];
    // const randomQuery = currentFood[Math.floor(Math.random() * currentFood.length)];
    // const randomResult = randomQuery.name
    //     fetch(`${config.REACT_APP_API_URL}?q=${randomResult}`, {
    //             method: "GET",
    //             headers: {
    //               "x-rapidapi-key": config.REACT_APP_API_KEY,
    //               "x-rapidapi-host": config.REACT_APP_API_HOST,
    //             },
    //           })
    //         .then(res => res.json())
    //         .then(data => setResults(data.hits))
    //         .catch(error => {
    //             console.error('There has been a problem with your fetch operation:', error);
    //           });
  }, []);

  return (
    <div>
      <p>{results.length ? mapped() : ""}</p>
    </div>
  );
}

export default RecipeSuggestions;
