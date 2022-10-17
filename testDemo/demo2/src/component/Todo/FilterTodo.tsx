import React from 'react';

interface Props {
    todoListProp: { id: number, title: string, completed: boolean }[],
    doneTodoTask?: (val: boolean, id: number) => void;
    deleteTodo?: (id: number) => void;
    editTodo?: (id: number, newTodo: string) => void;
}

const FilterTodo = ({todoListProp, doneTodoTask, deleteTodo, editTodo}: Props) => {
    return (
        <>
            filter todo
        </>
    );
};

export default FilterTodo;