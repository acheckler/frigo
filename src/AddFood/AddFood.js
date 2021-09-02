import React, { Component } from "react";
import ApiContext from "../ApiContext";
import moment from "moment";


class AddFood extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      checkedItems: [], //combination of current checked items & items previously added to 'fridge'
      currentlySelected: [], // keeps tracks of current checks, re-sets on page refresh & 'clear checks' function
       foodList: JSON.parse(localStorage.getItem("fetchData")) || [],

      localStorage: JSON.parse(localStorage.getItem("selectedFood")) || [],
    };
    this.initialState = { ...this.state };
  }

  componentDidMount() {
    const checkedFood = localStorage.getItem("selectedFood");
    const parsedFood = JSON.parse(checkedFood);
    this.setState({
      checkedItems: parsedFood || [],
    });
  }




  //food search
  onChange = (e) => {
    const foodData = JSON.parse(localStorage.getItem("fetchData")) || []  //create a persisent data set to filter through
    const searchTerm = e.target.value;
    const filteredFood = foodData.filter(
      (foodItem) =>
        foodItem.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
    this.setState({ foodList: filteredFood, searchTerm: searchTerm });
  };

  //food checkbox
  onCheck = (e) => {
    const name = e.target.name;
    const id = e.target.id;
    const date = moment(new Date()).format("MM/DD/YY")
    const selected = { name, id, date };

    const isDuplicateChecked = this.state.checkedItems.some(
      (item) => item.name === selected.name
    );
    const isDuplicatedSelected = this.state.currentlySelected.some(
      (item) => item.name === selected.name
    );

    if (isDuplicateChecked) {
      this.filterSelected(selected);
    } else if (isDuplicatedSelected) {
      this.filterSelected(selected);
    } else {
      this.addSelected(selected);
    }

  };

  // adding to state when checkbox clicked, updates selectedFood state
  addSelected = (selected) => {
    this.setState((prevState) => {
      return {
        checkedItems: [
          ...prevState.checkedItems,
          { name: selected.name, id: selected.id, date: selected.date },
        ],
        currentlySelected: [
          ...prevState.currentlySelected,
          { name: selected.name, id: selected.id, date: selected.date },
        ],
      };
    });
  };

  //filter to check for duplicates
  filterSelected = (selected) => {
    const newStateSelected = this.state.currentlySelected.filter(
      (item) => item.name !== selected.name
    );
    const newState = this.state.checkedItems.filter(
      (item) => item.name !== selected.name
    );
    this.setState({
      checkedItems: newState,
      currentlySelected: newStateSelected,
    });
  };

  // actual 'add to fridge' button event handler, updates local storage not state
  handleAddFood = () => {
    const selectedFood = this.state.checkedItems;
    if (selectedFood.length === 0) {
      window.alert("Oops! Please select items to add to fridge.");
    }
    localStorage.setItem("selectedFood", JSON.stringify(selectedFood));
    this.props.history.push("/");
  };

  resetChecks = () => {
    this.setState({ currentlySelected: this.initialState.currentlySelected});
  };

  render() {
    const { foodList, currentlySelected, localStorage } = this.state;


    //checking currentlySelected & local storage for a list to display what is currently checked
    const displayList = localStorage.length
      ? foodList.filter(
          (f) => !localStorage.find(({ name }) => f.name === name)
        )
      : foodList;

    //checking checkedItems against foodList, filtering into a new array, then returns a boolean value
    const isChecked = (item) => {
      const items = currentlySelected.filter((food) => {
        return food.name === item.name;
      });
      return !!items.length;
    };
  
    return (
      <div className="add-food-page">
        <div className="food-array-list">
          <input type="text" placeholder="search" onChange={this.onChange} />
          <ul className="foodList">
            {displayList.map((item) => {
              return (
                  <li className="foodItem" key={item.name}>
                      {item.name}
                      <input
                        type="checkbox"
                        id={item.id}
                        name={item.name}
                        className="checkbox"
                        checked={isChecked(item)}
                        onChange={this.onCheck}
                      />
                  </li>
              );
            })}
          </ul>
        </div>
        <div className="selected-food">
          <p>Filling Your Fridge with:</p>
          <ul>
            {currentlySelected.length ? 
            (currentlySelected.map((selected) => {
                return <li key={selected.id}>{selected.name}</li>;
              })) : (<p>Nothing, yet! <br/> Select items and hit 'Add Food' to save them.</p>)}
          </ul>
          <button type="button" onClick={this.resetChecks}>
            Clear Checked Items
          </button>
          <button type="submit" onClick={this.handleAddFood}>
            Add To Fridge
          </button>
        </div>
      </div>
    );
  }
}

AddFood.contextType = ApiContext;

export default AddFood;
