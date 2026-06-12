import {createSlice} from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            { id: 1, text: 'Buy Milk', description: 'Get 2% milk from the store, also check if we need eggs.', status: 'completed' },
            { id: 2, text: 'Walk the dog', description: 'Take Max to the park for at least 30 minutes.', status: 'in-progress' },
            { id: 3, text: 'Read a book', description: 'Continue reading "Clean Code" from chapter 5.', status: 'completed' },
            { id: 4, text: 'Write code', description: 'Finish the task manager app and add missing features.', status: 're-do' },
            { id: 5, text: 'Exercise', description: '20 min cardio + upper body workout.', status: 'todo' },
        ],
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload)
        },
        removeTodo: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload)
        },
        updateStatus: (state, action) => {
            const todo = state.items.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.status = action.payload.status
            }
        },
        updateTodo: (state, action) => {
            const todo = state.items.find(todo => todo.id === action.payload.id)
            if (todo) {
                Object.assign(todo, action.payload)
            }
        },
        moveTodo: (state, action) => {
            const { activeId, overId } = action.payload
            const activeIndex = state.items.findIndex(t => t.id === activeId)
            const overIndex = state.items.findIndex(t => t.id === overId)
            state.items[activeIndex].status = state.items[overIndex].status
            const [item] = state.items.splice(activeIndex, 1)
            const insertAt = activeIndex < overIndex ? overIndex - 1 : overIndex
            state.items.splice(insertAt, 0, item)
        },
    },
})

export const { addTodo, removeTodo, updateStatus, updateTodo, moveTodo } = todoSlice.actions
export default todoSlice.reducer