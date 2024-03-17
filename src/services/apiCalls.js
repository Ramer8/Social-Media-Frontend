export const loginMe = async (credenciales) => {
  const options = {
    method: "POST", //  envio por post  email y password para logearme
    headers: {
      "Content-Type": "application/json", // Esto para que es?
    },
    body: JSON.stringify(credenciales),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}auth/login`,
      options
    )

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
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}auth/register`,
      options
    )

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
export const fetchMyProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}users/profile`,
      options
    )

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}
