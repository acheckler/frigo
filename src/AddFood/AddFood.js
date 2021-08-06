import React, { Component } from "react";
import food from "../dummy-store";

class AddFood extends Component {
  state = {
    searchTerm: "",
    selectedFood: [],
    foodList: food.food,
    checkboxes: 0,
  };
  //   componentDidUpdate(prevState) {
  //     // Check if Cart updated
  //     if (prevState.selectedFood !== this.state.selectedFood) {
  //       // It did! Now compute new total and discount state
  //       this.state.selectedFood.map((item) => {
  //         return(
  //             <li>{item.selected}</li>
  //         )
  //     })
  //   }
  // }
  onchange = (e) => {
    const searchTerm = e.target.value;
    console.log(searchTerm);
    //   this.setState({foodList: filteredFood, searchTerm: searchTerm});
    const filteredFood = food.food.filter((foodItem) => {
      console.log(foodItem);
      return (
        foodItem.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    });
    this.setState({ foodList: filteredFood, searchTerm: searchTerm });
  };

  onCheck = (e) => {
    
    var date = new Date().toLocaleString() + "";
    var selected = e.target.name;
    //   var checkbox = document.getElementById("foodName")
    console.log(selected);
    
    this.setState((prevState) => {
        console.log(prevState)
        return{
            selectedFood: [...prevState.selectedFood, { selected, date }],
        }
    //   selectedFood: [...prevState.selectedFood, { selected, date }],
    //   showing: true,
    });

    console.log(this.state.selectedFood);

    //check for duplicates in state, check/uncheck if present or not
   
  };

  handleAddFood = () => {
    const selectedFood = this.state.selectedFood;
    localStorage.setItem("selectedFood", JSON.stringify(selectedFood));
    console.log(selectedFood, "hi thereee");
  };



  render() {
    console.log(this.state.foodList);
    const filteredFood = food.food.filter((foodItem) => {
      return (
        foodItem.name
          .toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) !== -1
      );
    });
    const SelectedFoodDisplay = () => {
      this.state.selectedFood.map((item) => {
        return <li>{item.selected}</li>;
      });
    };
    console.log(
      this.state.selectedFood.filter((food) => {
        return food.selected === "Apple";
      }).length
    );
    // const filteredFood = food.food.filter((foodItem) => {
    //     return (
    //       foodItem.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    //     );
    //   });
    // const filteredFood = food.food.find(f => f.name == this.state.searchTerm)


    return (
      <div className="add-food-page">
        <div className="food-array-list">
          <input type="text" placeholder="search" onChange={this.onchange} />
          <ul className="foodList">
            {this.state.foodList.map((item) => {
              // return <div>{item.Name}</div>
              return (
                <li className="foodItem" key={item.name}>
                  {" "}
                  <input
                    type="checkbox"
                    id="foodItem"
                    name={item.name}
                    checked={
                      this.state.selectedFood.filter((food) => {
                        return food.selected === item.name;
                      }).length
                    }
                    //   value={this.state.selectedFood.filter((food) => {
                    //     return food.selected === item.name
                    //   }).length}
                    onChange={this.onCheck}
                  ></input>
                  <label htmlFor="foodItem" id="foodName">
                    {item.name}
                  </label>{" "}
                </li>
              );
            })}
            {/* {food.food.filter((item) => {
              if (this.state.searchTerm == "") {
                  return item
              } else if (item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                  return item
              }
          }).map((item) => {
              return (
                <li className="foodItem">
                {" "}
                <input
                  type="checkbox"
                  id="food-checkbox"
                  name={item.name}
                  value={item.id}
                  onChange={this.onCheck}
                ></input>
                <label htmlFor="foodItem">{item.name}</label>{" "}
              </li>
              )
          })
          } */}
          </ul>
        </div>
        <div className="selected-food">
          <p>Filling Your Fridge with:</p>
          {this.state.selectedFood.map((selected) => {
            return <li>{selected.name}</li>;
          })}
          {/* {this.state.showing ? <SelectedFoodDisplay /> : null} */}
          <button type="submit" onClick={() => this.handleAddFood()}>
            Add To Fridge
          </button>
        </div>
      </div>
    );
  }
}

export default AddFood;
