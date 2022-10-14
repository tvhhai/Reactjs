import React from 'react';
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
const TodoList = () => {

    const items = JSON.parse(localStorage.getItem('todo') || "[]");
    const [todoList, setTodoList] = React.useState<{ id: number, title: string, completed: boolean }[]>(items);

    React.useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todoList));
        console.log(todoList)
    }, [todoList]);

    return (
        <div>
            <TodoInput todoListProp={todoList}
                       onProductTypeChange={setTodoList}/>
            <TodoItem todoListProp={todoList} onProductTypeChange={setTodoList}/>
        </div>
    );
};

export default TodoList;