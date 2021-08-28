import React, { Component } from "react";
import FridgeContents from "../Services/fridgeContent";
import RecipeSuggestions from "../Services/recipeSuggestions";

class Home extends Component {
  render() {
    const currentFood = JSON.parse(localStorage.getItem("selectedFood")) || [];
    return (
      <div className="home-page">
        <h2>Welcome to Frigo!</h2>
        <p className="home-p">
          Frigo was built to help you better plan for meals and reduce waste. It
          will keep track of what you have in your fridge, when you got it, and
          what you can make with it.
        </p>
        <ul>
          <li className="home-li-beginning">Instead of letting your perishables expire because you...</li>
          <li className="home-li-middle">didn't know what to make with them</li>
          <li className="home-li-middle">they were hidden in the back of your fridge forgotton</li>
          <li className="home-li-middle">you didn't realize how long you've had them for</li>
          <li className="home-li-end">just check Frigo!</li>
        </ul>
        <p className="home-p">
          Use it at home to view your options quickly instead of rummaging
          through your fridge, or while out and about to make a plan for dinner
          and decide if you need to make a stop at the store on your way home! 
        </p>
        <p className="home-p">Wherever or however you use Frigo, make sure to use the same device everytime.</p>
        <h2>{currentFood.length ? "Currently in your fridge:" : "Your fridge is empty, click 'Add Food' to get started!"}</h2>
        <ul className="fridge-list">
          <FridgeContents />
        </ul>
        {currentFood.length ? <RecipeSuggestions /> : ""}
      </div>
    );
  }
}

export default Home;
