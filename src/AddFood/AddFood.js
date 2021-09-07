import React, { Component } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

class AddFood extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      checkedItems: [], //combination of current checked items & items previously added to 'fridge'
      currentlySelected: [], // keeps tracks of current checks, re-sets on page refresh & 'clear checks' function
      foodList: JSON.parse(localStorage.getItem("fetchData")) || [],
      localStorage: JSON.parse(localStorage.getItem("selectedFood")) || [],
      listOpenF: false,
      listOpenV: false,
      listOpenMS: false,
      listOpenD: false,
      listOpenMi: false,
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
    this.setState({
      listOpenF: true,
      listOpenV: true,
      listOpenMS: true,
      listOpenD: true,
      listOpenMi: true,
    });

    const foodData = JSON.parse(localStorage.getItem("fetchData")) || []; //create a persisent data set to filter through
    const searchTerm = e.target.value;
    console.log(searchTerm);
    const filteredFood = foodData.filter(
      (foodItem) =>
        foodItem.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
    this.setState({ foodList: filteredFood, searchTerm: searchTerm });
    if (searchTerm === "") {
      this.setState({
        listOpenF: false,
        listOpenV: false,
        listOpenMS: false,
        listOpenD: false,
        listOpenMi: false,
      });
    }
  };

  //food checkbox
  onCheck = (e) => {
    const name = e.target.name;
    const id = e.target.id;
    const date = moment(new Date()).format("MM/DD/YY");
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
    this.setState({ currentlySelected: this.initialState.currentlySelected });
  };

  toggleListF = (list) => {
    this.setState({ listOpenF: !this.state.listOpenF });
  };

  toggleListV = () => {
    this.setState({ listOpenV: !this.state.listOpenV });
  };

  toggleListMS = () => {
    this.setState({ listOpenMS: !this.state.listOpenMS });
  };

  toggleListD = () => {
    this.setState({ listOpenD: !this.state.listOpenD });
  };

  toggleListMi = () => {
    this.setState({ listOpenMi: !this.state.listOpenMi });
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

    const listItem = (item) => {
      return (
        <li className="foodItem" key={item.name}>
          {item.name}
          <input
            type="checkbox"
            id={item.id}
            aria-label={item.name}
            name={item.name}
            className="checkbox"
            checked={isChecked(item)}
            onChange={this.onCheck}
          />
        </li>
      );
    };

    return (
      <div className="add-food-page">
        <form htmlFor="add-food-form" className="af-selectable-lists">
          <input
            type="text"
            aria-label="text-search"
            placeholder="Search"
            id="af-search-box"
            onChange={this.onChange}
          />
          <ul className="af-foodList">
            <li onClick={this.toggleListF} className="af-li-header">
              Fruits{" "}
              <FontAwesomeIcon
                icon={this.state.listOpenF ? faChevronUp : faChevronDown}
                className="af-chevron"
                style={{ display: this.state.searchTerm ? "none" : "" }}
              />
            </li>
            {this.state.listOpenF
              ? displayList
                  .filter((i) => i.category === "Fruits")
                  .map((item) => listItem(item))
              : ""}

            <li onClick={this.toggleListV} className="af-li-header">
              Vegetables{" "}
              <FontAwesomeIcon
                icon={this.state.listOpenV ? faChevronUp : faChevronDown}
                className="af-chevron"
                style={{ display: this.state.searchTerm ? "none" : "" }}
              />{" "}
            </li>
            {this.state.listOpenV
              ? displayList
                  .filter((i) => i.category === "Vegetables")
                  .map((item) => listItem(item))
              : ""}

            <li onClick={this.toggleListMS} className="af-li-header">
              Meat/Seafood{" "}
              <FontAwesomeIcon
                icon={this.state.listOpenMS ? faChevronUp : faChevronDown}
                className="af-chevron"
                style={{ display: this.state.searchTerm ? "none" : "" }}
              />
            </li>
            {this.state.listOpenMS
              ? displayList
                  .filter((i) => i.category === "Meat/Seafood")
                  .map((item) => listItem(item))
              : ""}

            <li onClick={this.toggleListD} className="af-li-header">
              Dairy{" "}
              <FontAwesomeIcon
                icon={this.state.listOpenD ? faChevronUp : faChevronDown}
                className="af-chevron"
                style={{ display: this.state.searchTerm ? "none" : "" }}
              />
            </li>
            {this.state.listOpenD
              ? displayList
                  .filter((i) => i.category === "Dairy")
                  .map((item) => listItem(item))
              : ""}

            <li onClick={this.toggleListMi} className="af-li-header">
              Miscellaneous{" "}
              <FontAwesomeIcon
                icon={this.state.listOpenMi ? faChevronUp : faChevronDown}
                className="af-chevron"
                style={{ display: this.state.searchTerm ? "none" : "" }}
              />
            </li>
            {this.state.listOpenMi
              ? displayList
                  .filter((i) => i.category === "Miscellaneous")
                  .map((item) => listItem(item))
              : ""}
          </ul>
        </form>
        <div className="af-selected-food">
          <p>Filling Your Fridge with...</p>
          <ul>
            {currentlySelected.length ? (
              currentlySelected.map((selected) => {
                return <li key={selected.id}>{selected.name}</li>;
              })
            ) : (
              <p>
                Nothing, yet! <br /> Select items and hit 'Add Food' to save
                them.
              </p>
            )}
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



export default AddFood;
