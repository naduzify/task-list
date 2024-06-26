import { useContext } from 'react'
import { listContext } from './App'

export function ManageArchive () {
    const [tasks, setTasks] = useContext(listContext)

    const deleteArchive = () => {
        const updateTasks = tasks.filter(e => !e.isArchived)

        setTasks(updateTasks)
        localStorage.setItem('task-list', JSON.stringify(updateTasks))
    }

    const restoreArchives = () => {
        const updateTasks = tasks.map(e => {
            if(e.isArchived) e.isArchived = false
            return e
        })

        setTasks(updateTasks)
        localStorage.setItem('task-list', JSON.stringify(updateTasks))
    }

    const archivedTasks = tasks?.filter(e => e.isArchived)

    return (
        <div className='archive-wrap'>
            {archivedTasks.length > 0 && 
                (
                    <>
                    <span className='small'>
                        There are {archivedTasks.length} tasks archived
                    </span>
                    <span className='small clear-archive underline' onClick={deleteArchive}>
                        Clear archives
                    </span>
                    <span className='small clear-archive underline' onClick={restoreArchives}>
                        Restore archives
                    </span>
                    </>
                )
            }
        </div>
    )
}