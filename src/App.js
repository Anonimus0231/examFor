import './App.css';
import Header from './components/Header/Header';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import { useState } from 'react';

function App() {

  const [messag, setMessag] = useState([])
  const [inputs, setInputs] = useState({
    title: "",
    status: "",
})

  

  return (
    <div className="App">
      <Header />
      <AddTodo  messag={messag}  setMessag={setMessag} inputs={inputs} setInputs={setInputs}/>
      <TodoList messag={messag}  setMessag={setMessag} inputs={inputs} setInputs={setInputs}/>
    </div>
  );
}

export default App;