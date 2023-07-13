import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTasks } from '../api/tasks.api'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

export function TasksFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const navigate = useNavigate()
  const params = useParams()
  // console.log(params)

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data)
      toast.success('Tarea actualizada', {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
    } else {
      await createTask(data)
      toast.success('Tarea creada', {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
    }
    navigate('/tasks')
  })

  useEffect(() => {
    async function loadTasks() {
      if (params.id) {
        const { data } = await getTasks(params.id)
        setValue('title', data.title)
        setValue('description', data.description)
      }
    }
    loadTasks()
  }, [])

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          type="text"
          placeholder="title"
          {...register('title', { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <textarea
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          placeholder="Description"
          rows="3"
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>This field is required</span>}

        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>save</button>
      </form>
      {params.id && (
        <div className='flex justify-end'>
          <button
        className='bg-red-500 p-3 rounded-lg w-48 mt-3'
          onClick={async () => {
            // const accept = window.confirm('are you sure?')
            // if (accept) {
            await deleteTask(params.id)
            toast.success('Tarea eliminada', {
              position: 'bottom-right',
              style: {
                background: '#101010',
                color: '#fff',
              },
            })
            navigate('/tasks')
            // }
          }}
        >
          Delete
        </button>
        </div>
      )}
    </div>
  )
}
