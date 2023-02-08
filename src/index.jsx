import { ReactDOM } from "react-dom";
import React from "react";

const App = () => {
  const todos = [
    { id: 1, title: '姉に誕生日プレゼントを買う' },
    { id: 2, title: '論文提出' },
    { id: 3, title: '市役所に住民票の写しをもらいに行く' }
  ]

  return (
    <>
      {/* 問題1. inputとボタンを設置しよう */}

      {/* ここまで */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
