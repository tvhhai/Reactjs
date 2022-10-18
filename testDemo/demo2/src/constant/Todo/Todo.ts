import React from 'react';

const TODO_BTN_FILTER = [
    { type: "all", label: "All", isActive: true },
    { type: "active", label: "Active", isActive: false },
    { type: "completed", label: "Completed", isActive: false },
]


const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY, ESCAPE_KEY, TODO_BTN_FILTER };