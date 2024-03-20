import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plantItems, deleteItem, updateItemPrice }) {
  return (
    <ul className="cards">
      {
      plantItems.map(item => (<PlantCard 
        updateItemPrice={updateItemPrice} 
        deleteItem={deleteItem} 
        item={item} 
        key={item.id} />)
      )}</ul>
  );
}
export default PlantList;
