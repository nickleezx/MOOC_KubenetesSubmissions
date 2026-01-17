import axios from "axios";
import { getEnv } from "../config";

// const baseUrl = import.meta.env.BACKEND_URL || "http://localhost:8081/api"
// const baseUrl = import.meta.env.BACKEND_URL || "http://localhost:3001/api"

const baseUrl = getEnv('BACKEND_URL')

const getTodoNotes = (async () => {
  const response = await axios.get(`${baseUrl}/todo`)
  return response.data
})

const postTodoNotes = (async (newNote) => {
  const response = await axios.post(`${baseUrl}/todo`, newNote)
  return response.data
})

export default {
  getTodoNotes,
  postTodoNotes
}