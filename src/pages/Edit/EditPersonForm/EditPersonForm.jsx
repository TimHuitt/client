import { useState, useEffect } from 'react'
import { getPerson, updatePerson } from '../../../utilities/people-service'
import { useParams, useNavigate, Link } from 'react-router-dom'

const EditPersonForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });

  const { id } = useParams()

  const handleRequest = async () => {
    try {
      const personData = await getPerson(id)
      if (personData) setNewForm(personData)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  function handleChange(e) {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    handleRequest()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, image, title} = newForm
    const newPerson = await updatePerson(id, {name, image, title})
    console.log(newPerson)
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
export default EditPersonForm