import { useEffect } from 'react'
import {TasksList} from '../components/TasksList'

export function TasksPage() {

  useEffect(()=>{
    console.log("first")
  },[])

  return <TasksList/>
}
