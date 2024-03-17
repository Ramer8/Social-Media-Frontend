// const root = "https://socialnetwork-dev-stbs.2.ie-1.fl0.io/api/"
const root = "https://social-media-backend-dev-dmjn.1.us-1.fl0.io/api/"

export const loginMe = async (credenciales) => {
  const options = {
    method: "POST", //  envio por post  email y password para logearme
    headers: {
      "Content-Type": "application/json", // Esto para que es?
    },
    body: JSON.stringify(credenciales),
  }

  try {
    const response = await fetch(`${root}auth/login`, options)

    const data = await response.json()
    console.log(data)
    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}

export const registerMe = async (credenciales) => {
  const options = {
    method: "POST", //  envio por post  email y password para logearme
    headers: {
      "Content-Type": "application/json", // Esto para que es?
    },
    body: JSON.stringify(credenciales),
  }

  try {
    const response = await fetch(`${root}auth/register`, options)

    const data = await response.json()
    console.log(data)
    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}
