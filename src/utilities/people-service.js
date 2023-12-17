import * as peopleAPI from './people-api'

export const getPeople = async () => {
  try {
    const data = await peopleAPI.index()
    return data
  } catch (err) {
    console.log(err.message)
  }
}

export async function createPerson(data){
    try {
        const newPerson = await peopleAPI.create(data)
        console.log(newPerson)
        return newPerson
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export async function getPerson(id) {
  try {
    const data = await peopleAPI.find(id)
    return data
  } catch (err) {
    console.log(err.message)
  }
}

export async function deletePerson(id) {
  try {
    const deletedPerson = await peopleAPI.destroy(id);
    return deletedPerson;
  } catch (err) {
    throw err;
  }
}

export async function updatePerson(id, data) {
  try {
    const updatedPerson = await peopleAPI.update(id, data);
    if (updatedPerson) {
      return updatedPerson;
    } else {
      console.log('error')
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
}