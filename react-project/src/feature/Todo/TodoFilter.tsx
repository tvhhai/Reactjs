import React from 'react';
import {TODO_BTN_FILTER} from "../../constant/todo";
import {Button} from "@mui/material";
import {ITodoBtn} from "../../model/ITodo";

interface Props {
    count: number,
    hasCompleted: () => boolean,
    filterTodo?: (typeFilter: string) => void;
    clearTodoCompleted?: () => void;
}

const TodoFilter = ({count, hasCompleted, filterTodo, clearTodoCompleted}: Props) => {

    React.useEffect(() => {
        setActiveTodoWord(pluralize(count, 'item'));
    }, [count]);

    const pluralize = (count: number, word: string) => {
        return count === 1 ? word : word + 's';
    }

    const [activeTodoWord, setActiveTodoWord] = React.useState<any>(pluralize(count, 'item'));
    const [filterButtons] = React.useState<ITodoBtn[]>(TODO_BTN_FILTER);
    const [activeType, setActiveType] = React.useState<string>('all');


    const handleFilter = (typeFilter: string) => {
        setActiveType(typeFilter)
        filterTodo?.(typeFilter)
    }

    const handleClear = () => {
        clearTodoCompleted?.();
    }

    return (
        <div className={'todoFooter'}>
            <div className="row h-100 d-flex align-items-center m-0">
                <div className={'col-sm-12 col-md-4 my-2 text-left'}>
                    <strong>{count}</strong> {activeTodoWord} left
                </div>
                <div className={'col-sm-12 col-md-4 d-flex justify-content-md-center justify-content-sm-start my-2'}>
                    {
                        filterButtons.map((val, i) => {
                            return (
                                <Button key={i} className={`filterBtn ${val.type === activeType? 'active' : ''}`}
                                        onClick={() => handleFilter(val.type)}
                                >{val.label}</Button>
                            )
                        })
                    }
                </div>
                {
                    hasCompleted() ? (<div
                        className={'col-sm-12 col-md-4 d-flex justify-content-md-center justify-content-sm-start my-2'}>
                        <Button className="filterBtn"
                                onClick={handleClear}
                        >Clear completed</Button>
                    </div>) : (<></>)
                }

            </div>
        </div>
    );
};

export default TodoFilter;