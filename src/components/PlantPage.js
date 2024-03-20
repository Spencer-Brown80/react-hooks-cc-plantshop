import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plantItems, setPlantItems] = useState ([])
  const [search, setSearch] = useState('')

  
//fetches data to render plants when the page loads
  useEffect(() => {
    fetch(`http://localhost:6001/plants`)
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        console.error('error')
      }
    })
    .then(data => setPlantItems(data))
  }, [])

  //Pass updateSearch as a prop to Search.js
  const updateSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  //Pass deleteItem as a prop to PlantList.js and then PlantCard.js
  const deleteItem = (id) => {
    //filter item out of state 
    setPlantItems(plantItems.filter(item => {
      //if current item does not have matching id
      //keep current item
      if(item.id !== id){
        return true 
      } else {
        return false
      }
      
    }))
  }

  //Pass updateItemPrice as a prop to PageList.js and then PageCard.js
  const updateItemPrice = (id, newPrice) => {
    setPlantItems(plantItems.map(item => {
      if (item.id === id) {
        return { ...item, price: newPrice }; // Update the price of the item
      }
      return item; // For other items, return them as they are
    }));
  }
 //Pass addItem to NewPlantForm.js
  const addItem = (newItem) => {
    setPlantItems([...plantItems, newItem])
  }

  //Ensures that when searching in searchbar that it is not case-sensitive
  const filteredPlantItems = plantItems.filter(item => {
    //convert everything to lowercase
    //ask if search is in item description 
    const lowerSearch = search.toLowerCase()
    const lowerItem = item.name.toLowerCase()
    if(lowerItem.includes(lowerSearch)){
      return true
    } else {
      return false
    }
  })

  return (
    <main>
      <NewPlantForm addItem={addItem}/>
      <Search updateSearch={updateSearch}/>
      <PlantList 
      plantItems={filteredPlantItems} 
      deleteItem={deleteItem} 
      updateItemPrice={updateItemPrice}/>
    </main>
  );
}

export default PlantPage;
