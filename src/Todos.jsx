import App from './App.css';
import React, {useState, useEffect} from 'react';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [showTodos, setShowTodos] = useState(false);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then(res => res.json())
        .then(tehtavat => setTodos(tehtavat))
    }, []);


    return (
        <>
        <h2 onClick={() => setShowTodos(!showTodos)}>Todos from Typicode</h2>
        <table className="tehtavatTaulu">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {showTodos && todos.map(todo => (
                    <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.userId}</td>
                    <td>{todo.title}</td>
                    <td>{todo.completed ? "Yes" : "No" }</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Todos;