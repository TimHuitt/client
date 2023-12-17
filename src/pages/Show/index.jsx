import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPerson, deletePerson } from '../../utilities/people-service'

const Show = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [person, setPerson] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()

  const handleRequest = async () => {
    try {
      const personData = await getPerson(id)
      if (personData) setPerson(personData)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const handleDelete = async () => {
    try {
      await deletePerson(id)

      navigate('/')
    } catch (err) {

    }
  }

  useEffect(() => {
    handleRequest()
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        <h1 className="mb-10">show</h1>
        <p>{person.name}</p>
        <img src={person.image} />
        <p>{person.title}</p>
        <button onClick={(e)=>handleDelete(e)}>Delete</button>
        <Link to={"/people/" + id + "/edit"}>
          <button>Edit</button>
        </Link>
        
      </>
  )
  }
}

export default Show;