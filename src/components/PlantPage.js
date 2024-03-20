import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plantItems, setPlantItems] = useState ([])
  const [search, setSearch] = useState('')

  

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

  const updateSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

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

  const updateItemPrice = (id, newPrice) => {
    setPlantItems(plantItems.map(item => {
      if (item.id === id) {
        return { ...item, price: newPrice }; // Update the price of the item
      }
      return item; // For other items, return them as they are
    }));
  }

  const addItem = (newItem) => {
    setPlantItems([...plantItems, newItem])
  }

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
