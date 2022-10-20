import React from 'react';
import {Checkbox, TextField} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import {ENTER_KEY, ESCAPE_KEY} from "../../constant/Todo/Todo";
import {ITodo} from "../../model/Todo";

interface Props {
    todoListProp: ITodo,
    doneTodoTask?: (val: boolean, id: number) => void;
    deleteTodo?: (id: number) => void;
    editTodo?: (id: number, newTodo: string) => void;
}

const TodoItem = ({todoListProp, doneTodoTask, deleteTodo, editTodo}: Props) => {
    const inputRef = React.useRef<any>();

    const [todoList, setTodoList] = React.useState(todoListProp);
    const [isEdit, setIsEdit] = React.useState(false);
    const [value, setValue] = React.useState(todoListProp.title);

    React.useEffect(() => {
        inputRef.current?.focus();
    }, [isEdit]);

    React.useEffect(() => {
        setTodoList(todoListProp);
    }, [todoListProp]);

    const handleDoneTodoTask = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        doneTodoTask?.(e.target.checked, id);
    };

    const handleDelete = (id: number) => {
        deleteTodo?.(id);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
        let title = e.target.value && e.target.value.trim();
        submitTodo(id, title);
        setIsEdit(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, id: number) => {
        if (e.keyCode === ENTER_KEY && value) {
            let title = value && value.trim();
            submitTodo(id, title);
            setIsEdit(false);
        }
        if (e.keyCode === ESCAPE_KEY) {
            setIsEdit(false);
        }
    }

    const submitTodo = (id: number, title: string) => {
        editTodo?.(id, title);
    }


    return (
        <div className="todoItem d-flex justify-content-between align-items-center"
             style={{border: isEdit ? "none" : ''}}>
            <div className={`todo ${todoList.completed ? 'completed' : ''}`} onDoubleClick={() => setIsEdit(true)}>
                <Checkbox checked={todoList.completed} onChange={(e) => handleDoneTodoTask(e, todoList.id)}/>
                <label>{todoList.title}</label>
                {
                    isEdit ? (
                        // <input className="editTodoInput" type="text" value={value}
                        //        ref={inputRef}
                        //        onBlur={(e) => handleBlur(e, todoList.id)}
                        //        onChange={e => setValue(e.target.value)}
                        //        onKeyDown={(e) => handleKeyDown(e, todoList.id)}
                        // />
                        <TextField fullWidth
                                   autoFocus
                                   className="editTodoInput"
                                   value={value}
                                   variant="standard"
                                   id="fullWidth"
                                   onBlur={(e) => handleBlur(e, todoList.id)}
                                   onChange={e => setValue(e.target.value)}
                                   onKeyDown={(e) => handleKeyDown(e, todoList.id)}
                        />
                    ) : (<></>)
                }
            </div>
            {
                isEdit ? (<></>) : (
                    <div className="d-flex align-items-center">
                        <span className="icon-wrapper text-center edit">
                            <CreateIcon onClick={() => setIsEdit(true)}/>
                        </span>

                        <span className="icon-wrapper text-center delete">
                            <CloseIcon onClick={() => handleDelete(todoList.id)}/>
                        </span>
                    </div>
                )
            }

        </div>
    );
};

export default TodoItem;