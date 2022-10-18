import React from 'react';

import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import TodoCompleteAll from "./TodoCompleteAll";
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "../../constant/Todo/Todo";

const TodoList = () => {

    const items = JSON.parse(localStorage.getItem('todo') || "[]");
    const [todoList, setTodoList] = React.useState<{ id: number, title: string, completed: boolean }[]>(items);
    const [typeFilter, setTypeFilter] = React.useState(ALL_TODOS);

    React.useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }, [todoList]);

    const activeTodoCount = todoList.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
    }, 0);

    const shownTodos = todoList.filter((todo) => {
        switch (typeFilter) {
            case ACTIVE_TODOS:
                return !todo.completed;
            case COMPLETED_TODOS:
                return todo.completed;
            default:
                return todo;
        }
    });

    const addTodo = (todo: { id: number, title: string, completed: boolean }) => {
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

    const handleFilterTodo = (type: string) => {
        setTypeFilter(type)
    }

    const handleClearTodoCompleted = () => {
        const removedArr = [...todoList].filter(todo => !todo.completed);
        setTodoList(removedArr);
    }

    const hasCompletedTodo = (): boolean => {
        return (todoList.length > activeTodoCount);
    }

    const completeAllTodo = (isComplete: boolean) => {
        const completeAllTodo = [...todoList].map((val, i) => {
           val.completed = isComplete
             return val;
        });
        setTodoList(completeAllTodo);
    }

    return (
        <div className="todoWrapper">
            <div className="todoHeader d-flex w-100 align-items-center">
                <TodoCompleteAll isChecked={!activeTodoCount} completeAllTodo={completeAllTodo}/>
                <TodoInput todoListProp={todoList} addTodo={addTodo}/>
            </div>

            <div className={'todoListItem'}>
                {
                    shownTodos.map((todo, i) => {
                        return (
                            <TodoItem key={i} todoListProp={todo}
                                      doneTodoTask={handleDoneTodoTask}
                                      deleteTodo={handleDeleteTodo}
                                      editTodo={handleEditTodo}/>
                        )
                    })
                }
            </div>
            {
                todoList.length ? (<TodoFilter count={activeTodoCount}
                                               hasCompleted={hasCompletedTodo}
                                               filterTodo={handleFilterTodo}
                                               clearTodoCompleted={handleClearTodoCompleted}
                />) : (<></>)
            }
        </div>
    );
};

export default TodoList;