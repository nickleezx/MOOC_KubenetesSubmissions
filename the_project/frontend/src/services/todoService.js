import axios from "axios";

const baseUrl = import.meta.env.BACKEND_URL || "http://localhost:8081/api"
// const baseUrl = import.meta.env.BACKEND_URL || "http://localhost:3001/api"

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