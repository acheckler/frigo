import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import AddFood from "./AddFood/AddFood";
import RecipeSearch from "./Recipes/RecipeSearch";
import Home from "./Home/Home";
import ApiContext from "./ApiContext";
import config from "./config";

class App extends Component {
  state = {
    food: [],
  };

  currentFood = JSON.parse(localStorage.getItem("selectedFood")) || [];

  // TODO: turn into fetch for food DB
  // fetchData = () => {
  //   fetch(`http://localhost:8000/api`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.setState({
  //         food: data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // componentDidMount() {
  //   this.fetchData();

  // }

  render() {
    const value = {
      fetchData: this.fetchData,
      recipeSearch: this.recipeSearch,
      recipes: this.state.recipes,
      query: this.state.query,
      food: this.state.food,
    };

    return (
      <ApiContext.Provider value={value}>
        <main>
          <header className="App-header">
            <Link to="/">Frigo</Link>
          </header>
          <nav className="app-nav">
            <Link to="/addFood">Add food</Link>
            <Link to="/recipes">Search for Recipes</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addFood" component={AddFood} />
            <Route exact path="/recipes" component={RecipeSearch} />
          </Switch>
        </main>
      </ApiContext.Provider>
    );
  }
}

export default App;
