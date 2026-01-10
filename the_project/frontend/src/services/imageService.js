import axios from "axios";

const baseUrl = import.meta.env.BACKEND_URL || "http://localhost:8081/api/image"
// const baseUrl = import.meta.env.BACKEND_URL || "http://localhost:3001/api/image"

export const getImagePromise = (async () => {
  try {
    const response = await axios.get(baseUrl, {
      responseType: 'blob'
    });

    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error(error)
  }
})()  //returns a promise object
