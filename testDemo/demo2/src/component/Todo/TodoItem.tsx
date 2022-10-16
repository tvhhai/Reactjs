import React, {ChangeEvent, KeyboardEventHandler} from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';


interface Props {
    todoListProp: { id: number, title: string, completed: boolean, isEdit: boolean },
    onProductTypeChange?: (newType: any) => void;
    doneTodoTask?: (val: boolean, id: number) => void;
    deleteTodo?: (id: number) => void;
    editTodo?: (id: number, newTodo: string) => void;

}

const TodoItem = ({todoListProp, onProductTypeChange, doneTodoTask, deleteTodo, editTodo}: Props) => {
    const inputRef = React.useRef<any>();

    const [todoList, setTodoList] = React.useState(todoListProp);
    const [isEdit, setIsEdit] = React.useState(false);
    const [value, setValue] = React.useState(todoListProp.title);


    const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        doneTodoTask?.(e.target.checked, id);
    };

    const handleDelete = (id: number) => {
        deleteTodo?.(id);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>, id: number) => {
        let title = e.target.value && e.target.value.trim();
        submitTodo(id, title);
        setIsEdit(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === 'Enter' && value) {
            let title = value && value.trim();
            submitTodo(id, title);
            setIsEdit(false)
        }
    }

    const submitTodo = (id: number, title: string) => {
        editTodo?.(id, title);
    }

    React.useEffect(() => {
        inputRef.current?.focus();
    }, [isEdit]);

    return (

        <div className="container todo-item d-flex justify-content-between align-items-center">
            <div className={`todo ${todoList.completed ? 'completed' : ''}`} onDoubleClick={() => setIsEdit(true)}>
                <Checkbox checked={todoList.completed} onChange={(e) => handleChange(e, todoList.id)}/>
                <label>{todoList.title}</label>
                {
                    isEdit ? (
                        <input className="edit-form" type="text" value={value}
                               ref={inputRef}
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
                            <DeleteIcon onClick={() => handleDelete(todoList.id)}/>
                        </span>
                    </div>
                )
            }

        </div>
    );
};

export default TodoItem;