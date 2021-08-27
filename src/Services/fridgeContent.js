import React from "react";

function FridgeContents() {
  const handleDelete = (name) => {
    const updatedFood = currentFood.filter((item) => item.name !== name);
    localStorage.setItem("selectedFood", JSON.stringify(updatedFood));
    window.location.reload();
  };

  const currentFood = JSON.parse(localStorage.getItem("selectedFood")) || [];
  if (currentFood.length) {
    return currentFood.map((item) => {
      return (
        <li key={item.id} className="food-li">
          {item.name} Date added: {item.date}
          <button
            type="button"
            id="delete"
            value={item}
            onClick={() => handleDelete(item.name)}
          >
            <img
              src="/minus-square-regular.svg"
              className="trash-icon"
              alt="recipe"
            ></img>
          </button>
        </li>
      );
    });
  } else {
    return <p className="empty-fridge">Your fridge is empty, click 'Add Food' to get started!</p>;
  }
}

export default FridgeContents;
