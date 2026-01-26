import TaskItem from "./TaskItem";

export default function TaskList({tasks, filter, onDeleteTask, onToggleTask, onEditTask}) {
    let emptyMessage = "No tasks yet. Add one above 👆";
    
    if (filter === "completed") {
        emptyMessage = "You haven't completed any tasks yet";
    } else if (filter === "pending") {
        emptyMessage = "No pending tasks 🎉";
    }

    return (
        <div>
            <h2>Your Tasks</h2>
            {/* Rendering task */}
            {tasks.length === 0 ? (
                <p style={{ color: 'grey', fontSize: '16px'}}>{emptyMessage}</p>
            ) : (
                <ul style={{listStyle: "none"}}>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <TaskItem
                                title={task.title} 
                                completed={task.completed} 
                                onDelete={() => onDeleteTask(task.id) }
                                onToggle={() => onToggleTask(task.id) }
                                onEdit={(newTitle)=> onEditTask(task.id, newTitle)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}