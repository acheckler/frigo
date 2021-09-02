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
  

 
  //fetch data from db
  fetchData = () => {
    const currentFood = JSON.parse(localStorage.getItem("fetchData")) || []
    fetch(`${config.REACT_APP_DATABASE_URL}`, {
       method: "GET",
     })
      .then((res) => res.json())
      .then((data) => {
        if(currentFood.length !== data.length) {
          window.localStorage.setItem('fetchData', JSON.stringify(data));
          this.setState({
            food: data
          })
        }
        this.setState({
          food:data
        }) 
      })
      .catch((err) => {
        console.error(err);
      });
    }


  componentDidMount() {
    this.fetchData();
  }

  render() {
    const value = {
      fetchData: this.fetchData,
      food: this.state.food,
    };
    
    return (
      <ApiContext.Provider value={value}>
        <main>
          <header className="App-header">
            <Link to="/" className="app-title">Frigo</Link>
            <nav className="app-nav">
            <Link to="/addFood" className="f-link">Add food</Link>
            <Link to="/recipes" className="r-link">Search for Recipes</Link>
          </nav>
          </header>
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
