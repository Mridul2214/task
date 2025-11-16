import { useState } from 'react';
import { taskAPI } from '../services/api';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
  });

  const handleToggleComplete = async () => {
    try {
      const updatedTask = await taskAPI.updateTask(task._id, {
        ...task,
        completed: !task.completed,
      });
      onUpdate(updatedTask.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await taskAPI.updateTask(task._id, {
        ...task,
        ...editData,
      });
      onUpdate(updatedTask.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await taskAPI.deleteTask(task._id);
      onDelete(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEdit} className="edit-form">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            required
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Description"
          />
          <div className="edit-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-content">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
          </div>
          <div className="task-actions">
            <button onClick={handleToggleComplete} className="complete-btn">
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
