import { useState, useEffect } from "react";
import { createPerson } from "../../utilities/people-service";

export default function NewPersonForm({ handleRequest }) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });
  

  async function handleSubmit(e) {
    e.preventDefault();
    const newPerson = await createPerson(newForm)
    handleRequest()
  }

  function handleChange(e) {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  }


  return (
    <section className="flex justify-center flex-col">
      <h2>Create a new person</h2>
      <form className="flex justify-center flex-col" onSubmit={handleSubmit}>
        <input
          className="block m-3"
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          className="block m-3"
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          className="block m-3"
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input className="border-white" type="submit" value="Create Person" />
      </form>
    </section>
  );
}
