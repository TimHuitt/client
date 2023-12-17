import config from '../config'

export const index = async () => {
  const res = await fetch(config.BASE_URL)
  if (res.ok) {
    return res.json()
  } else {
    throw new Error("invalid!")
  }
}

export async function create(data){
  try {
      const res = await fetch(config.BASE_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      if (res.ok) {
          return res.json()
      } else {
        throw new Error("Invalid")
      }
  } catch (err) {
      throw new Error('Invalid Request')
  }
}

export const find = async (id) => {
  const res = await fetch(`${config.BASE_URL}/${id}`)
  if (res.ok) {
    return res.json()
  } else {
    throw new Error("invalid!")
  }
}

export async function destroy(id) {
  const url = `${config.BASE_URL}/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}


export const update = async (id, data) => {
  const url = `${config.BASE_URL}/${id}`;
  // console.log(url)
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    return res.json()
  } else {
    throw new Error("invalid!")
  }
}

