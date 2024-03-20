import React, { useState } from "react";

function PlantCard({ item, deleteItem, updateItemPrice }) {

  const [stock, setStock] = useState(item.stock)
  const [newValue, setNewValue] = useState(' ');

 //Toggles item if is in stock or out of stock.  This also persists
 //after change. 
  const handleClick = () => {
    // Toggle stock status and update local state
    setStock(prevStock => !prevStock);
    // Update the stock status in the database 
    fetch(`http://localhost:6001/plants/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stock: !stock }) // Invert the stock status
    })
      .then(res => {
        if (!res.ok) {
          console.error('Failed to update stock status');
        }
      })
      .catch(error => {
        console.error('Error updating stock status:', error);
      });
  }

  //Deletes item from the db.json
  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${item.id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        console.error('sad')
      }
    })
    //deleteItem if DELETE request was successful
    .then(() => deleteItem(item.id))
  }

  //updates value in db.json
  const handleUpdateValue = () => {
    if (newValue.trim() !== '') { // Check if the value is not an empty string
      fetch(`http://localhost:6001/plants/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: parseFloat(newValue) }) // Parse the value to a float
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Failed to update price');
          }
        })
        .then(data => {
          updateItemPrice(item.id, data.price); // Pass item id along with new price
          setNewValue("");
        })
        .catch(error => {
          console.error('Error updating price:', error);
        });
    } else {
      console.error('Empty value provided'); // Handle the case where the value is empty
    }
  };

//Sets new value after price is updated
  const handleValueChange = (e) => {
    setNewValue(e.target.value);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={item.image} alt={item.name} />
      <h4>{item.name}</h4>
      <p>Price: ${item.price}</p>
      {stock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick} >Out of Stock</button>
      )}
      <button onClick={handleDelete} className="emoji-button delete">🗑</button>
      <input
        type="number"
        step="0.01"
        value={newValue}
        onChange={handleValueChange}
        placeholder="Enter new price"
      />
      <button onClick={handleUpdateValue}>Update Price</button>
    </li>
  );
}

export default PlantCard;
