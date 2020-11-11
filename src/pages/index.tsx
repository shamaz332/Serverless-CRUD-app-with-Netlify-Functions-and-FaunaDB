import React from 'react';
import CreateTodo from "../todos/create-todo"
import  {ReadTodo}  from "../todos/readTodo"
export default function Home() {
    return <div>
        <h1>Helo from Todo</h1>
        <CreateTodo />
        <ReadTodo />
    </div>
}