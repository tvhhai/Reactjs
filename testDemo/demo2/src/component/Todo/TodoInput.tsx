import React from 'react';

interface Props {
    todoListProp: { id: number, title: string, completed: boolean }[];
    onProductTypeChange?: (newType: any) => void;
}

const TodoInput = ({todoListProp, onProductTypeChange}: Props) => {
    const [todoValue, setTodoValue] = React.useState('');
    const [todoList, setTodoList] = React.useState(todoListProp);

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && todoValue) {
            let value = todoValue && todoValue.trim();
            setTodoList((prev: any) => [...prev, {id: todoList.length + 1, title: value, completed: false}]);
            setTodoValue('');
        }
    }
    React.useEffect(() => {
        if (onProductTypeChange) {
            onProductTypeChange([...todoList])
        }
    }, [todoList]);

    return (
        <input type="text"
               value={todoValue}
               placeholder="What needs to be done?"
               onChange={e => setTodoValue(e.target.value)}
               onKeyDown={handleKeyDown}
               required/>

    );
};

export default TodoInput;