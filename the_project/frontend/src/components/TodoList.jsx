import { useState } from "react"

const sampleList = [
"Learn Javascript", "Learn React", "Build a project"
]

export const TodoList = () => {
  const [todoList, setTodoList] = useState(sampleList)
  const [todoInput, setTodoInput] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const onClick = (e) => {
    e.preventDefault()
    // make api call
    if (todoInput.length > 140) {
      setErrorMsg("Todo item too long")
      setTimeout(() => setErrorMsg(""), 5000)
      return
    }

    setTodoList(prev => [...prev, todoInput]);
    setTodoInput("")
  }

  return (
    <div>
      <div>
        <ul>
          {todoList.map(l => <li>{l}</li>)}
        </ul>
      </div>
      <div>
        <input type="text" value={todoInput} onChange={e => setTodoInput(e.target.value)}/>
        <button onClick={onClick}>Create todo</button>
        {errorMsg && <div style={{color: "red"}}>{errorMsg}</div>}
      </div>


    </div>
  )
}