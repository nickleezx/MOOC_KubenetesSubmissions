import axios from "axios";
import { getEnv } from "../config";

// const baseUrl = import.meta.env.BACKEND_URL || "http://localhost:8081/api"
// const baseUrl = import.meta.env.BACKEND_URL || "http://localhost:3001/api"

const baseUrl = getEnv('BACKEND_URL')

export const getImagePromise = (async () => {
  try {
    const response = await axios.get(`${baseUrl}/image`, {
      responseType: 'blob'
    });

    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error(error)
  }
})()  //returns a promise object
