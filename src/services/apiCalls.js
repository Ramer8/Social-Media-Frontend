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
      "Content-Type": "application/json",
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

export const updateProfile = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/profile`,
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
export const getAllUsersPosts = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/`,
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
//Changed for previous function..
// export const getMyPosts = async (token) => {
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }
//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}/posts/own`,
//       options
//     )

//     const data = await response.json()
//     if (!data.success) {
//       throw new Error(data.message)
//     }
//     return data
//   } catch (error) {
//     return error
//   }
// }
export const createPost = async (data, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts`,
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

export const putlikes = async (userId, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
    params: JSON.stringify(userId),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/like/${userId}`,
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
export const deletePost = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${id}`,
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

export const updateMyPost = async (id, data, token) => {
  console.log(id)
  console.log(data)
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    params: JSON.stringify(id),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${id}`,
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

export const fetchAllUsers = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users`,
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
export const deleteMoreThanOneUsers = async (array, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(array),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users`,
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
export const deleteMoreThanOnePosts = async (array, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(array),
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts`,
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

export const searchUsers = async (searchParam, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(
      // api/users?email=john@example.com&name=John `/api/users?${searchParam}`

      // `${import.meta.env.VITE_API_URL}/users?email=${email}&name=${name}`,
      // `${import.meta.env.VITE_API_URL}/users?email=${email}`,
      `${import.meta.env.VITE_API_URL}/users?${searchParam}`,
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
