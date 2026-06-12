import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addTodo, removeTodo, updateStatus, updateTodo, moveTodo} from '../store/todoSlice'
import {DndContext, useDroppable, DragOverlay, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {Pencil, Check, Trash2} from 'lucide-react'

export default function TaskBoard() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const [activeId, setActiveId] = useState(null)
    const activeTask = todos.items.find(t => t.id === activeId)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 250, tolerance: 5 },
        })
    )

    const byStatus = status => todos.items.filter(t => t.status === status)

    function handleDragStart({ active }) {
        setActiveId(active.id)
    }

    function handleDragEnd({ active, over }) {
        setActiveId(null)
        if (!over || active.id === over.id) return

        const overIsTask = todos.items.some(t => t.id === over.id)

        if (overIsTask) {
            dispatch(moveTodo({ activeId: active.id, overId: over.id }))
        } else {
            // over.id is a column status string — drop on empty column
            dispatch(updateStatus({ id: active.id, status: over.id }))
        }
    }

    return (
        <div className="task-board">
            <div className="container-fluid">
                <div className="py-3">
                    <h2 className="mb-0">Task Board</h2>
                </div>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="task-row pb-3">
                        <div className="inner">
                            <Column status="todo" title="To Do" titleClass="text-primary" tasks={byStatus('todo')}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => dispatch(addTodo({ id: Date.now(), text: 'New Task', description: '', status: 'todo' }))}
                                >Add Task</button>
                            </Column>
                            <Column status="in-progress" title="In Progress" titleClass="text-warning" tasks={byStatus('in-progress')} />
                            <Column status="completed" title="Completed" titleClass="text-success" tasks={byStatus('completed')} />
                            <Column status="re-do" title="Re-do" titleClass="text-danger" tasks={byStatus('re-do')} />
                        </div>
                    </div>
                    <DragOverlay>
                        {activeTask ? <TaskOverlay task={activeTask} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    )
}

function Column({ status, title, titleClass, tasks, children }) {
    const { setNodeRef, isOver } = useDroppable({ id: status })
    return (
        <div
            className="task-column"
            ref={setNodeRef}
            style={{ background: isOver ? 'rgba(0,0,0,0.04)' : undefined, transition: 'background 0.2s' }}
        >
            <h5 className={`${titleClass} mb-2`}>{title}</h5>
            <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                <div className={`tasks tasks-${status}`}>
                    {tasks.map(t => <Task key={t.id} task={t} />)}
                    {children}
                </div>
            </SortableContext>
        </div>
    )
}

function Task({ task }) {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [draftText, setDraftText] = useState(task.text)
    const [draftDescription, setDraftDescription] = useState(task.description)

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

    const style = {
        opacity: isDragging ? 0.3 : 1,
        transform: transform ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)` : undefined,
        transition,
    }

    function handleSave() {
        dispatch(updateTodo({ id: task.id, text: draftText, description: draftDescription }))
        setIsEditing(false)
    }

    return (
        <div className="task" ref={setNodeRef} style={style}>
            <div className="mb-2">
                <div
                    {...listeners}
                    {...attributes}
                    style={{ cursor: 'grab', color: '#aaa', fontSize: 18, marginBottom: 6, userSelect: 'none', width: 'fit-content', touchAction: 'none' }}
                >
                    ⠿⠿
                </div>
                {isEditing
                    ? <input className="form-control mb-2" type="text" value={draftText} onChange={e => setDraftText(e.target.value)} />
                    : <h5 className="mb-2">{task.text}</h5>
                }
                {isEditing
                    ? <textarea className="form-control mb-2" rows={2} placeholder="Description..." value={draftDescription} onChange={e => setDraftDescription(e.target.value)} />
                    : task.description && <p className="text-muted small mb-2">{task.description}</p>
                }
                <div className="d-flex">
                    {isEditing
                        ? <button className="btn btn-sm btn-outline-success d-flex align-items-center gap-1" onClick={handleSave}><Check size={14} />Save</button>
                        : <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1" onClick={() => setIsEditing(true)}><Pencil size={14} />Edit</button>
                    }
                    <button className="btn btn-sm btn-outline-danger ms-2 d-flex align-items-center gap-1" onClick={() => dispatch(removeTodo(task.id))}><Trash2 size={14} />Delete</button>
                </div>
            </div>
            <small className="mb-1 text-muted">Status</small>
            <div className="btn-status-group btn-group btn-group-sm w-100" role="group">
                <button
                    type="button"
                    className={`btn ${task.status === 'todo' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => dispatch(updateStatus({ id: task.id, status: 'todo' }))}
                >To Do</button>
                <button
                    type="button"
                    className={`btn ${task.status === 'in-progress' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => dispatch(updateStatus({ id: task.id, status: 'in-progress' }))}
                >In Progress</button>
                <button
                    type="button"
                    className={`btn ${task.status === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => dispatch(updateStatus({ id: task.id, status: 'completed' }))}
                >Done</button>
                <button
                    type="button"
                    className={`btn ${task.status === 're-do' ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => dispatch(updateStatus({ id: task.id, status: 're-do' }))}
                >Re-do</button>
            </div>
        </div>
    )
}

function TaskOverlay({ task }) {
    return (
        <div className="task" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)', cursor: 'grabbing' }}>
            <div style={{ color: '#aaa', fontSize: 18, marginBottom: 6 }}>⠿⠿</div>
            <h5 className="mb-2">{task.text}</h5>
            {task.description && <p className="text-muted small mb-2">{task.description}</p>}
        </div>
    )
}
