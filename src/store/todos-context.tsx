import React, { useState } from 'react';

import Todo from '../models/todo';

interface TodosContextInterface {
	items: Todo[];
	addTodo: (todoText: string) => void;
	removeTodo: (todoId: string) => void;
}

export const TodosContext = React.createContext<TodosContextInterface>({
	items: [],
	addTodo: () => {},
	removeTodo: (todoId: string) => {},
});

const TodosContextProvider: React.FC = (props) => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodoHandler = (todoText: string) => {
		const newTodo = new Todo(todoText);

		setTodos((prevTodos) => {
			return [...prevTodos, newTodo];
		});
	};

	const removeTodoHandler = (todoId: string) => {
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.id !== todoId);
		});
	};

	const contextValue: TodosContextInterface = {
		items: todos,
		addTodo: addTodoHandler,
		removeTodo: removeTodoHandler,
	};

	return (
		<TodosContext.Provider value={contextValue}>
			{props.children}
		</TodosContext.Provider>
	);
};

export default TodosContextProvider;
