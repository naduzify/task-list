import './App.css';
import { useState, useEffect, createContext } from 'react'
import { TaskList } from './TaskList';
import { ManageArchive } from './ManageArchive'

export const listContext = createContext(null)

export default function App() {
  const [taskList, setTaskList] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem('task-list'))
    if(localTasks) setTaskList(localTasks)
  }, [])

  const addTask = (e) => {
    if(text.length === 0 || e.type == 'keydown' && e.key !== 'Enter') return

    const createdAt = new Date();
    const uuid = crypto.randomUUID();
    const newTask = {
      id: uuid,
      title: text,
      createdAt: createdAt,
      status: 'to-do',
      isArchived: false
    }
    setText('');
    
    const newList = [...taskList, newTask]
    setTaskList(newList);
    localStorage.setItem('task-list', JSON.stringify(newList))
  }

  return (
    <listContext.Provider value={[taskList, setTaskList]}>
      <div className="App">
        <main>
          <section className='container'>
            <h1 className='sec-ttl'>To do list</h1>

            <div className='input-wrap'>
              <input 
                className='task-input'
                type='text' placeholder='Enter a task name and press enter or click add button'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={addTask}
              />
              <button 
                className='main-cta' 
                onClick={addTask}
              >
                Add
              </button>
            </div>
            
            <ManageArchive />

            <div className='task-container'>
              <TaskList />
            </div>
            
          </section>
        </main>
      </div>
    </listContext.Provider>
  );
}