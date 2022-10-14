import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';


interface Props {
    todoListProp: { id: number, title: string, completed: boolean }[],
    onProductTypeChange?: (newType: any) => void;
}

const TodoItem = ({todoListProp, onProductTypeChange}: Props) => {
    const [todoList, setTodoList] = React.useState(todoListProp);

    const handleChange = (val: boolean, i: number, event: React.ChangeEvent<HTMLInputElement>) => {
        todoList[i].completed = !val;
        if (onProductTypeChange) {
            onProductTypeChange((prev: any) => [...prev])
        }
    };

    const handleDelete = (id: number) => {
        setTodoList(todoList.filter(item => item.id !== id));

    }
    React.useEffect(() => {
        if (onProductTypeChange) {
            onProductTypeChange(todoList)
        }
    }, [todoList]);

    React.useEffect(() => {
        setTodoList(todoListProp);
        if (onProductTypeChange) {
            onProductTypeChange(todoListProp)
        }
    }, [todoListProp]);


    return (
        <div>
            {
                todoList && todoList.length > 0 ? todoList.map((v: any, i: number) => (
                    <div key={i} className="
                                  container
                                  todo-item
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                ">
                        <div className="todo">
                            <Checkbox checked={v.completed} onChange={(e) => handleChange(v.completed, i, e)}/>
                            <label  >{v.title}</label>
                        </div>

                        <div className="d-flex align-items-center">
                            <span className="icon-wrapper text-center edit">
                                <CreateIcon/>
                            </span>

                            <span className="icon-wrapper text-center delete">
                                <DeleteIcon onClick={() => handleDelete(v.id)}/>
                            </span>
                        </div>

                        {/*<input className="edit-form" type="text" value={v.title}*/}
                        {/*       id={v.id.toString()}/>*/}
                    </div>
                )) : (
                    <div/>
                )
            }

        </div>
    );
};

export default TodoItem;