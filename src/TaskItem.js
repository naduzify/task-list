import { useState, useContext } from 'react'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { GiConfirmed } from 'react-icons/gi'
import { MdModeEdit } from "react-icons/md"
import { listContext } from './App'
import { motion } from "framer-motion"

export function TaskItem( {item} ) {
    const [tasks, setTasks] = useContext(listContext)
    const [isEdit, setIsEdit] = useState(false)
    const [text, setText] = useState(item.title)
    const timeMessage = getTimeMsg(item.createdAt)

    // Can maybe use a reducer for the functions below
    // Remove item on click 
    const removeTask = () => {
        const updateTasks = tasks.map(e => {
            if(e.id === item.id) e.isArchived = true
            return e
        })

        setTasks(updateTasks);
        localStorage.setItem('task-list', JSON.stringify(updateTasks))
    }

    // Complete item on click
    const completeItem = () => {
        const updateTasks = tasks.map(e => {
            if(e.id === item.id) e.status = 'completed'
            return e
        })

        setTasks(updateTasks);
        localStorage.setItem('task-list', JSON.stringify(updateTasks))
    }

    // Edit item on click
    const editItem = () => {
        setIsEdit(false);

        const updateTasks = tasks.map(e => {
            if(e.id === item.id) e.title = text
            return e
        })

        setTasks(updateTasks);
        localStorage.setItem('task-list', JSON.stringify(updateTasks))
    }

    return (
        <motion.li layout className={item.status === 'completed' ? 'completed task-item' : 'task-item'}>

            {isEdit ? 
                (
                    <>
                    <motion.textarea 
                        className='edit-input' 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className='controls'>
                        <span className='complete-item' onClick={editItem}>
                            <GiConfirmed />
                        </span>
                    </div>
                    </> 
                ) : (
                    <>
                        <motion.div className='task-wrap'>
                            <motion.span className='item-name'>{item?.title}</motion.span>
                            <motion.span className='created-at'>{timeMessage}</motion.span>
                        </motion.div>
                        
                        <div className='controls'>
                            {item.status !== 'completed' && (
                                <>
                                    <span className='edit-item' onClick={() => setIsEdit(true)}>
                                        <MdModeEdit />
                                    </span>
                                    <span className='complete-item' onClick={completeItem}>
                                        <GiConfirmed />
                                    </span>
                                </>
                            )}
                            
                            <span className='remove-item' onClick={removeTask}>
                                <RiDeleteBack2Line />
                            </span>
                        </div>
                    </>
                )
            }

        </motion.li>
    )
}

function getTimeMsg(time) {
    const now = Date.parse(new Date())
    const timeDiff = (now - Date.parse(time)) / 1000
    let timeMessage = 'Created '
    
    if(timeDiff < 2) timeMessage += `just now.`
    else if(timeDiff < 60) timeMessage += ` ${Math.floor(timeDiff)} seconds ago.`
    else if(timeDiff < 120) timeMessage += 'a minute ago.'
    else if(timeDiff < 3600) timeMessage += ` ${Math.floor(timeDiff / 60)} minutes ago.`
    else if(timeDiff < 7200) timeMessage += ` an hour ago.`
    else if(timeDiff < 24*3600) timeMessage += ` ${Math.floor(timeDiff / 3600)} hours ago.`
    else if(timeDiff < 48*3600) timeMessage += `one day ago.`
    else if(timeDiff >= 48*3600) timeMessage += `${Math.floor(timeDiff / (24 * 3600))} days ago.`

    return timeMessage
}