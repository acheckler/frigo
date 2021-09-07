import React, { Component } from "react";
import FridgeContents from "../Services/fridgeContent";

class Home extends Component {
  
  render() {
  
    const currentFood = JSON.parse(localStorage.getItem("selectedFood")) || [];

    return (
      <div className="home-page">
        <div id="intro">
        <h2>Welcome to Frigo!</h2>
        <p className="home-p-top">
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
        <p className="home-p-bottom">Wherever or however you use Frigo, make sure to use the same device everytime.</p>
        </div>
        <div id="current-contents">
        {currentFood.length 
        ? <h2>Currently in your fridge:</h2> 
        : <h2 className="empty-fridge">Your fridge is empty.<br />"Click 'Add Food' to get started!</h2>}
        <ul className="fridge-list">
          <FridgeContents />
        </ul>
        </div>
      </div>
    );
  }
}

export default Home;
