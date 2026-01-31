import Header from './components/Header';
import Footer from './components/Footer';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const  [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => (
      task.id === id
      ? { ...task, completed: !task.completed }
      : task
    ));
    setTasks(updatedTasks);
  }

  function editTask(id, newTitle) {
    setTasks(
      tasks.map((task)=>
        task.id === id
        ? {...task, title: newTitle}
        : task
      )
    );
  }
  // Derived task
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;  
    if (filter === "pending") return !task.completed;

    // filter === "all"
    return true;
  })
  
const filterBtnStyle = (value) => ({
  padding: "6px 12px",
  borderRadius: "6px",
  border: filter === value ? "2px solid #646cff" : "1px solid #374151",
  backgroundColor: filter === value ? "#374151" : "#1f2937",
  color: "#f9fafb",
  fontWeight: filter === value ? "bold" : "normal",
});


  return (
    <div
      style={{
        minBlockSize: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}
      >
      <Header />
      <main
        style={{
          flex: 1,
          padding: "1.5rem",
          maxWidth: "800px",
          margin: "0 auto"
        }}
      >
        <AddTask addTask={addTask} />
        <div style={{ display: "flex", gap: "10px", margin:"16px 0"}}>
          <button
            onClick={()=>setFilter("all")}
            style={filterBtnStyle("all")}
          >
            All
          </button>
          <button
            onClick={()=>setFilter("completed")}
            style={filterBtnStyle("completed")}
          >
            Completed
          </button>
          <button
            onClick={()=>setFilter("pending")}
            style={filterBtnStyle("pending")}
          >
            Pending
          </button>
        </div>
        <TaskList 
          tasks={filteredTasks}
          filter={filter}
          onDeleteTask={deleteTask} 
          onToggleTask={toggleTask}
          onEditTask={editTask}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App;