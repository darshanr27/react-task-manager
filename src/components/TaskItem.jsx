import { useState } from "react";
export default function TaskItem({title, completed, onDelete, onToggle, onEdit}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const btnStyle = () => ({
        padding: "6px 10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        cursor: "pointer"
    })
    function handleSave() {
        if (editedTitle.trim() === "") return;
        onEdit(editedTitle);
        setIsEditing(false);
    }

    function handleCancel() {
        setEditedTitle(title);
        setIsEditing(false);
    }

    return (
        <div 
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #add",
            }}
        >
            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <input 
                    type="checkbox" 
                    checked={completed} 
                    onChange={onToggle}
                />
                {isEditing? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e)=>setEditedTitle(e.target.value)}
                        onKeyDown={(e)=>{
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") handleCancel();
                        }}
                        autoFocus
                    />
                ) : (
                    <span
                        style={{
                            textDecoration: completed ? "line-through" : "none",
                            color: completed ? "#9ca3af" : "var(--task-text)",
                            paddingRight: "30px"
                        }}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {title}
                    </span>
                )}
            </div>
            {isEditing ? (
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={handleSave} disabled={!editedTitle.trim()}
                        style={{
                            ...btnStyle,
                            opacity: !editedTitle.trim() ? 0.5 : 1,
                            cursor: !editedTitle.trim() ? "not-allowed" : "pointer",
                        }}
                    >
                        Save
                    </button>
                    <button onClick={handleCancel} style={btnStyle()}>Cancel</button>
                </div>
            ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={()=>setIsEditing(true)} style={btnStyle()} disabled={completed}>Edit</button>
                    <button onClick={onDelete} style={btnStyle()}>Delete</button>
                </div>
            )}
        </div>
    )
}