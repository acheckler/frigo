import React, { Component } from "react";
import "../App.css";
import config from "../config";
import FoodList from "./FoodList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

class RecipeSearch extends Component {
  state = {
    userQuery: "",
    fetchedRecipes: [],
    displayRecipes: false,
    ingredients: [],
    currentFood: JSON.parse(localStorage.getItem("selectedFood")) || [],
  };

  recipeFetch = (e) => {
    e.preventDefault();
    if (!this.state.ingredients.length) {
      alert("Whoops! Please select ingredients before searching");
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
      alert("Can't select more than 3 items. Click an item again to unselect");
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
      <style></style>;
      return this.state.fetchedRecipes.map((item) => {
        return (
          <div className="recipe-container" key={item.recipe.label}>
            <div>
              {item.recipe.label}
              <br />
              <a href={item.recipe.url} className="recipe-a-title">
                {item.recipe.source}
                <FontAwesomeIcon icon={faArrowRight} className="fa-arrow" />
              </a>
            </div>
            <img
              src={item.recipe.image}
              alt="recipe"
              className="recipe-img"
            ></img>
          </div>
        );
      });
    } else {
      return (
        <p>
          Sorry, something went wrong. Try again, or try a different combination
          of items.
        </p>
      );
    }
  };

  resetPage() {
    window.location.reload();
  }

  componentDidMount() {
    this.setState({ ingredients: [] });
  }



  render() {
    const { currentFood, ingredients } = this.state;

    const currentFoodMap = currentFood.map((item) => {
      return (
        <FoodList
          food={item}
          id={item.id}
          key={item.id}
          select={this.handleSelect}
          ingredients={ingredients}
        />
      );
    });

    return (
      <div className="recipe-search">
        <div
          className="rs-show-hide"
          style={{ display: this.state.displayRecipes ? "none" : "flex" }}
        >
          <p>
            {currentFood.length
              ? "Select 1 - 3 items to use to search for recipes!"
              : "Add food to your fridge to search for recipes!"}
          </p>
          <ul
            style={{ display: this.state.displayRecipes ? "none" : "" }}
            className="ingredients-list"
          >
            {currentFood.length ? currentFoodMap : ""}
          </ul>
          <form onSubmit={(e) => this.recipeFetch(e)}>
            <button
              type="submit"
              aria-label="search"
              className="recipe-search-button"
              style={{ display: currentFood.length ? "" : "none" }}
            >
              Search
            </button>
          </form>
        </div>
        <button
          onClick={(e) => this.resetPage(e)}
          type="reset"
          aria-label="new-search"
          className="new-search-btn"
          style={{ display: this.state.displayRecipes ? "" : "none" }}
        >
          Start A New Search
        </button>
        {this.state.displayRecipes ? this.displayRecipes() : null}
      </div>
    );
  }
}

export default RecipeSearch;
