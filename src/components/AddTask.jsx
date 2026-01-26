import { useState } from "react";

export default function AddTask( { addTask } ) {

    const [title, setTitle] = useState("");
     
    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === "") return;

        addTask(title);
        setTitle("");
    }

    
    return (
        <section
            style={{
                padding: "16px",
                border: "1px solid #5f9670ff",
                borderRadius: "10px"
            }}
        >
            <h2>Add New Task</h2>
            <form 
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    gap: "10px"
                }}
            >
                <input 
                    type="text" 
                    placeholder="Add a task..."
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    style={{
                        flex: "1",
                        height: "1.5rem"
                    }} 
                />
                <button type="submit">Add</button>
            </form>
        </section>
    );
}