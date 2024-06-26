import { TaskItem } from './TaskItem'
import { useContext } from 'react'
import { listContext } from './App'
import { motion } from "framer-motion"

export function TaskList() {
    const [tasks, setTasks] = useContext(listContext)

    const activeTasks = tasks?.filter(e => e.status === 'to-do' && !e.isArchived)
    activeTasks.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    const completeTasks = tasks?.filter(e => e.status === 'completed' && !e.isArchived)
    completeTasks.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

    return (
        <motion.ul layout className="task-list">
            {activeTasks.map(item => (
                <TaskItem item={item} key={item.id}/>
            ))}
            {completeTasks.map(item => (
                <TaskItem item={item} key={item.id}/>
            ))}
        </motion.ul>
    )
}