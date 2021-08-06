import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import config from "./config";
import AddFood from "./AddFood/AddFood"


// https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=76d6649b&app_key=2df24bd5834b69a0d31ef73b38d0632b

class App extends Component {
  state = {
    recipes: [],
    query: "chicken, rice",
  };

  fetchData = () => {
    fetch(`${config.REACT_APP_API_URL}?q=${this.state.query}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1496654bacmsha424417d7bdf872p173a8fjsn7e2e3473de2b",
        "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error(err);
      });
  };
  componentDidMount() {
    this.fetchData();
  }

  recipeSearch = (e) => {
    e.preventDefault()
    var query = e.target.query.value
    
    fetch(`${config.REACT_APP_API_URL}?q=${query}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1496654bacmsha424417d7bdf872p173a8fjsn7e2e3473de2b",
        "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((data) => this.setState({
        recipes: data
      }))
      .catch((err) => {
        console.error(err);
      });
  }

 
  render() {
    const currentFood = JSON.parse(localStorage.getItem('selectedFood'))
   

    const CurrentFoodFunc = ({currentFood}) => {
      console.log(currentFood)
     
      if (currentFood ?? "There is no food") {
        return ('None')
      } else if (currentFood != null) {
        return (
          currentFood.map((item) => {
            return (
          <li>{item.selected} Date added: {item.date}</li>)
          })
        )
    }
  }
    return (
      <div className="App">
        <header className="App-header">
          Frigo
        </header>
        <nav>
          <ul>
            <li>
              <Link to ="/addFood">Add food</Link>
            </li>
          </ul>
        </nav>
        <div>
        <Switch>
              <Route exact path="/addFood" component={AddFood} />
        </Switch>
        </div>
        <div>
          Currently in your fridge:
          <CurrentFoodFunc />
          <ul>
          {/* {this.state.showing ? <SelectedFoodDisplay /> : null} */}
              {/* {currentFood.map((item) => {
                return (
                  <li>{item.selected} Date added: {item.date}</li>
                )
              })} */}
          </ul>
        </div>
        <div>
          <form onSubmit={(e) => this.recipeSearch(e)}>
            <label htmlFor="query">Search for a recipe:</label>
          <input type="text" id="query"className="recipeSearch"></input>
          <button type="submit">Go</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
