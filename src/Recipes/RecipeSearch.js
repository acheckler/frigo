import React, { Component } from "react";
import "../App.css";
import config from "../config";

import FoodList from "./FoodList";

class RecipeSearch extends Component {
  state = {
    showing: false,
    userQuery: "",
    fetchedRecipes: [],
    displayRecipes: false,
    ingredients: [],
    currentFood: JSON.parse(localStorage.getItem("selectedFood")) || [],
  };

  recipeFetch = (e) => {
    e.preventDefault();
    if(!this.state.ingredients.length) {
      alert('Whoops! Please select ingredients before searching')
    } 
    const query = this.state.ingredients.toString();

    fetch(`${config.REACT_APP_API_URL}?q=${query}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": config.REACT_APP_API_KEY,
        "x-rapidapi-host": config.REACT_APP_API_HOST,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          fetchedRecipes: res.hits,
          displayRecipes: true,
        });
      })

      .catch((err) => {
        console.error(err);
      });
  };

  handleSelect = (selected) => {
    const ingredients = this.state.ingredients;
  
    if (ingredients.length === 3 && ingredients.includes(selected)) {
      const ingredientsFilter = ingredients.filter((i) => i !== selected);
      this.setState({
        ingredients: ingredientsFilter,
      });
    } else if (ingredients.length === 3) {
      alert("Can't select more than 3 items. Click an item again to unselect")
    } else if (ingredients.includes(selected)) {
      const ingredientsFilter = ingredients.filter((i) => i !== selected);
      this.setState({
        ingredients: ingredientsFilter,
      });
    } else {
      this.setState((prevState) => {
        return {
          ingredients: [...prevState.ingredients, selected],
        };
      });
    }
  };



  displayRecipes = () => {
    if (this.state.fetchedRecipes.length) {
      return this.state.fetchedRecipes.map((item) => {
        return (
          <div>
            <a href={item.recipe.url}>{item.recipe.label}</a>
            <img src={item.recipe.image} alt="recipe"></img>
          </div>
        );
      });
    } 
    else  {
     return <p>Sorry, something went wrong. Try again, or try a different combination of items.</p>
    }
  };
  componentDidMount(){
    this.setState({ingredients: []})
  }
  render() {
  
    const { currentFood, ingredients} = this.state;

    const currentFoodMap = currentFood.map((item) => {
      return <FoodList food={item} id={item.id} key={item.id} select={this.handleSelect} ingredients={ingredients} />;
    });

    return (
      <div className="recipe-search">
        <p>{currentFood.length ? "Select 1 - 3 items to use to search for recipes!" : "Add food to your fridge to search for recipes!"}</p>
        <form onSubmit={(e) => this.recipeFetch(e)}>
          <button 
          type="submit" 
          aria-label="search" 
          className="recipe-search-button"
          style={{ display: currentFood.length ? "" : "none" }}>
            Search
          </button>
          </form>
          <ul style={{ display: this.state.displayRecipes ? "none" : "" }}
            className="ingredients-list">
            {currentFood.length ? currentFoodMap : ""}
          </ul>
        
        {this.state.displayRecipes ? this.displayRecipes() : null}
      </div>
    );
  }
}

export default RecipeSearch;
