import React from 'react';
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import FilterTodo from "./FilterTodo";

const TodoList = () => {

    const items = JSON.parse(localStorage.getItem('todo') || "[]");
    const [todoList, setTodoList] = React.useState<{ id: number, title: string, completed: boolean}[]>(items);

    React.useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }, [todoList]);

    const addTodo = (todo:{ id: number, title: string, completed: boolean }) => {
        setTodoList(prevState => [...prevState, todo]);
    }

    const handleDoneTodoTask = (val: boolean, id: number) => {
        todoList.map((v, i) => {
            if (v.id === id)
                return v.completed = val;
        });
        setTodoList([...todoList]);
    }

    const handleDeleteTodo = (id: number) => {
        const removedArr = [...todoList].filter(todo => todo.id !== id);
        setTodoList(removedArr);
    }

    const handleEditTodo = (id: number, newTodo: string) => {
        todoList.map((v, i) => {
            if (v.id === id)
                return v.title = newTodo;
        });
        setTodoList([...todoList]);
    }

    return (
        <>
            <TodoInput todoListProp={todoList}
                       addTodo={addTodo}/>
            <>
                {
                    todoList.map((todo, i) => {
                        return (
                            <TodoItem key={i} todoListProp={todo}
                                      doneTodoTask={handleDoneTodoTask}
                                      deleteTodo={handleDeleteTodo}
                                      editTodo={handleEditTodo}/>
                        )
                    })
                }
            </>
            <FilterTodo todoListProp={todoList}
                        doneTodoTask={handleDoneTodoTask}
                        deleteTodo={handleDeleteTodo}
                        editTodo={handleEditTodo}/>

        </>
    );
};

export default TodoList;