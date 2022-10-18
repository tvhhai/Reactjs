import React from 'react';
import {TextField} from "@mui/material";
import {ENTER_KEY } from "../../constant/Todo/Todo";

interface Props {
    todoListProp: { id: number, title: string, completed: boolean }[];
    addTodo?: (newTodo: { id: number, title: string, completed: boolean }) => void;
}

const TodoInput = ({todoListProp, addTodo}: Props) => {
    const [todoValue, setTodoValue] = React.useState('');
    const [todoList, setTodoList] = React.useState(todoListProp);

    React.useEffect(() => {
        setTodoList(todoListProp)
    }, [todoListProp]);

    const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e)
        if (e.keyCode === ENTER_KEY && todoValue) {
            let value = todoValue && todoValue.trim();
            addTodo?.({id: todoList.length + 1, title: value, completed: false})
            setTodoValue('');
        }
    }

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoValue(e.target.value)
    }

    return (
        <div className='todoInput w-100'>
            <TextField fullWidth
                       label="What needs to be done?"
                       id="fullWidth"
                       value={todoValue}
                       autoFocus={true}
                       onChange={handleOnchange}
                       onKeyDown={handleAddTodo}/>
        </div>

    );
};

export default TodoInput;