import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([])
  const [todoTitle, setTodoTitle] = useState('')
  const [todoId, setTodoId] = useState(todos.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [filter, setFilter] = useState('notStarted')
  const [filteredTodos, setFilteredTodos] = useState([])
  //-----------------------------------------------------//
  const handleAddFormChange = (e) => {
    setTodoTitle(e.target.value)
  }
  const resetFormInput = () => {
    setTodoTitle('')
  }
  const handleAddTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted'}])
    setTodoId(todoId + 1)
    resetFormInput()
  }
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => targetTodo !== todo))
  }
  const handleEditOpenForm = (todo) => {
    setIsEditable(true)
    setEditId(todo.id)
    setNewTitle(todo.title)
  }
  const handleEditFormChange = (e) => {
    setNewTitle(e.target.value)
  }
  const handleEditCloseForm = () => {
    setIsEditable(false)
    setEditId('')
  }
  const handleEditTodo = () => {
    const newArray = todos.map((todo) => todo.id === editId ? { ...todo, title: newTitle } : todo )
    setTodos(newArray)
    setNewTitle('')
    setEditId('')
    handleEditCloseForm('')
  }
  const handleStatusChange = (targetTodo, e) => {
    const newArray = todos.map((todo) => todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo)
    setTodos(newArray)
  }
  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case 'notStarted':
          setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'))
          break
        case 'inProgress':
          setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'))
          break
        case 'done':
          setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
          break
        default:
          setFilteredTodos(todos)
      }
    }
    filteringTodos()
  }, [filter, todos])

  return (
    <>
      {isEditable ? (
      <div>
        <input type='text' label='新しいタイトル' value={newTitle} onChange={handleEditFormChange} />
        <button onClick={handleEditTodo}>編集を保存</button>
        <button onClick={handleEditCloseForm}>キャンセル</button>
      </div>
      ) : (
      <div>
        <input type='text' label='タイトル' value={todoTitle} onChange={handleAddFormChange} />
        <button onClick={handleAddTodo}>作成</button>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">すべて</option>
          <option value="notStarted">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
        </select>
      </div>)}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <select value={todo.status} onChange={(e) => handleStatusChange(todo, e)}>
              <option value='notStarted'>未着手</option>
              <option value='inProgress'>作業中</option>
              <option value='done'>完了</option>
            </select>
            <button onClick={() => handleEditOpenForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
