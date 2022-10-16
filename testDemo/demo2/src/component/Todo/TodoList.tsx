import React from 'react';
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

const TodoList = () => {

    const items = JSON.parse(localStorage.getItem('todo') || "[]");
    const [todoList, setTodoList] = React.useState<{ id: number, title: string, completed: boolean, isEdit: boolean }[]>(items);

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


    React.useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todoList));
        // console.log(todoList)
    }, [todoList]);

    return (
        <>
            <TodoInput todoListProp={todoList}
                       onProductTypeChange={setTodoList}/>

            <div>
                {
                    todoList.map((v, i) => {
                        return (
                            <TodoItem key={i} todoListProp={v} onProductTypeChange={setTodoList}
                                      doneTodoTask={handleDoneTodoTask}
                                      deleteTodo={handleDeleteTodo}
                                      editTodo={handleEditTodo}/>
                        )
                    })
                }
            </div>


        </>
    );
};

export default TodoList;