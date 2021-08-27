import React, { Component } from "react";
import FridgeContents from "../Services/fridgeContent";
import RecipeSuggestions from "../Services/recipeSuggestions";


class Home extends Component {
    
  render() {
    const currentFood = JSON.parse(localStorage.getItem("selectedFood")) || [];
    return (
      <div className="fridge-contents">
        <h2>Currently in your fridge:</h2>
        <ul className="fridge-list">
        <FridgeContents />
        </ul>
        {currentFood.length? <RecipeSuggestions /> : ""}
      </div>
    );
  }
}

export default Home;
