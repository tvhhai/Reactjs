import React from 'react';
import {TextField} from "@mui/material";

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
        if (e.key === 'Enter' && todoValue) {
            let value = todoValue && todoValue.trim();
            addTodo?.({id: todoList.length + 1, title: value, completed: false})
            setTodoValue('');
        }
    }

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoValue(e.target.value)
    }


    return (
        <TextField fullWidth
                   label="What needs to be done?"
                   id="fullWidth"
                   value={todoValue}
                   onChange={handleOnchange}
                   onKeyDown={handleAddTodo}/>

    );
};

export default TodoInput;