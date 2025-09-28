import React from 'react';
import TodoApp from './components/TodoApp';
import './App.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>나의 할 일 관리 앱</h1>
      </header>
      <main>
        <TodoApp />
      </main>
    </div>
  );
}
export default App;