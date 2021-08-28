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
              src="/delete.png"
              onMouseEnter={(e) => (e.currentTarget.src = "/delete2.png")}
              onMouseLeave={(e) => (e.currentTarget.src = "/delete.png")}
              id="trash-icon"
              alt="recipe"
            ></img>
          </button>
        </li>
      );
    });
  } else {
    return null
  }
}

export default FridgeContents;
