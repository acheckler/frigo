import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";

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
        <div className="li-div" key={item.name + "-container"}>
          <li key={item.id} className="h-food-li">
            <span className="hf-li-name">{item.name}</span>
            <br />
            <span className="hf-li-date">Added: {item.date}</span>
          </li>
          <FontAwesomeIcon
            icon={faMinusSquare}
            id="delete"
            key={item.name + "-delete"}
            value={item}
            role="delete-button"
            onClick={() => handleDelete(item.name)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
          />
        </div>
      );
    });
  } else {
    return null;
  }
}

export default FridgeContents;
