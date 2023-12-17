import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getPeople } from '../../utilities/people-service'
import './People.css'
import NewPersonForm from './NewPersonForm'
import Componenter from '../../components/Componenter'

const People = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [people, setPeople] = useState([])

  const handleRequest = async () => {
    try {
      const peopleData = await getPeople()
      if (peopleData) setPeople(peopleData)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleRequest()
  }, [])


  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <section>
        <Componenter />
        {/* <NewPersonForm handleRequest={handleRequest} /> */}
        <div id="secret-element" className='secret exclude secret-element'>
          this is the excluded text
          <div className='something'>
            and this is the excluded element
          </div>
        </div>
        <div id="not-secret-element">
          included
        </div>
        <div className="people-list">
          {people.map((p) => (
            <Link to={"/people/" + p._id}>
              <div key={p._id}>
                <h3>{p.name}</h3>
                  <img
                    className="profile-image"
                    src={p.image}
                    alt={`Image of ${p.name}`}
                  />
                <p>{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }
}

export default People