import React, { Component } from "react";

class FoodList extends Component {
  state = {
    isActive: false,
    selectedItems: [],
  };

  handleCheck = (itemName) => {
    this.setState({ isActive: !this.state.isActive });
    this.state.selectedItems.push(itemName);
    this.props.select(itemName);
  };

  render() {
    return (
      <li
        onClick={() => this.handleCheck(this.props.food.name)}
        className={this.state.isActive ? "active" : "inactive"}
      >
        {this.props.food.name}
      </li>
    );
  }
}

export default FoodList;
