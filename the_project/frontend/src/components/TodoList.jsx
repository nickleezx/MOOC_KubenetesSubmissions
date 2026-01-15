import { useState, useEffect } from "react"
import todoService from "../services/todoService"

// const sampleList = [
// "Learn Javascript", "Learn React", "Build a project"
// ]

export const TodoList = () => {
  const [todoList, setTodoList] = useState()
  const [todoInput, setTodoInput] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const fetchTodos = async () => {
    try {
      const data = await todoService.getTodoNotes();
      console.log(data)
      setTodoList(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  fetchTodos();
  }, [])

  const onClick = async (e) => {
    e.preventDefault()
    // make api call
    if (todoInput.length > 140) {
      setErrorMsg("Todo item too long")
      setTimeout(() => setErrorMsg(""), 5000)
      return
    }

    // setTodoList(prev => [...prev, todoInput]);
    const newNoteList = await todoService.postTodoNotes({title: todoInput})
    console.log(newNoteList)
    setTodoList(newNoteList);
    setTodoInput("")
  }

  if (!todoList) {
    return (<div>loading...</div>)
  }

  return (
    <div>
      <div>
        <ul>
          {todoList.map((l, index) => <li key={index}>{l}</li>)}
        </ul>
      </div>
      <div>
        <input type="text" value={todoInput} onChange={e => setTodoInput(e.target.value)} />
        <button onClick={onClick}>Create todo</button>
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      </div>


    </div>
  )
}