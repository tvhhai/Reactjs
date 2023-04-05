import React from 'react';
import './Todo.scss'
import TodoList from "./TodoList";
import CardLayout from "../../component/common/CardLayout/CardLayout";
import i18n from "i18next";

const Todo = () => {
    return (
        <CardLayout titleHeader={i18n.t('todo.title')}>
            <TodoList/>
        </CardLayout>
    );
};

export default Todo;

