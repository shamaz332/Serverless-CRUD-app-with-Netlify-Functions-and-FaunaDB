import { Link } from '@reach/router'
import React from 'react'
import CreateTodo from "./pages/todos/create-todo"

export const Home = () => {
    return (
        <div>

            <h1>Here is todos</h1>
            <Link to="/create-todo">Todo</Link>
         
        </div>
    )
}
