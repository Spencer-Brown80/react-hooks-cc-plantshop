import React, { useState } from "react";

//Creates the template for the NewPlantForm and also includes stock.
//Sets initial values to ' '.  
//Please note that stock has been added to the original items in the 
//db.json file
function NewPlantForm({ addItem }) {
  const initialForm = {
    //let json-server handle id
    name: '',
    image: '',
    price: '',
    stock: '',
}

const [form, setForm] = useState(initialForm)

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}

//Posts new plants to the db.json
const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:6001/plants`, {
        method: 'POST',
        headers: {'Content-Type': 'Application/JSON'},
        body: JSON.stringify(form)
    })
    .then(res => {
        if(res.ok){
            return res.json()
        } else {
            console.error('oops')
        }
    })
    .then(data => {
        addItem(data)
        setForm(initialForm)
    })
}

//Added Checkbox for stock which passes value of T/F
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} value={form.name} name="name" placeholder="Plant name" />
        <input type="text" onChange={(e) => handleChange(e)} value={form.image} name="image" placeholder="Image URL" />
        <input type="number" onChange={(e) => handleChange(e)} value={form.price} name="price" step="0.01" placeholder="Price" />
        <label>
          Plant is in Stock:{" "}  
          <input
            type="checkbox"
            onChange={(e) => setForm({ ...form, stock: e.target.checked })}
            checked={form.stock}
          />
        </label>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
