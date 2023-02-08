import ReactDOM from "react-dom";
import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([
  ])
  const [todoTitle, setTodoTitle] = useState('')
  const [todoId, setTodoId] = useState(todos.length + 1)
  //-----------------------------------------------------//
  const handleAddFormChange = (e) => {
    setTodoTitle(e.target.value)
  }
  const handleAddTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle}])
    setTodoId(todoId + 1)
    setTodoTitle('')
  }
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => targetTodo !== todo))
  }

  return (
    <>
      <input type='text' label='タイトル' value={todoTitle} onChange={handleAddFormChange} />
      <button onClick={handleAddTodo}>作成</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
