import { useState } from 'react';
import { taskAPI } from '../services/api';

const AddTask = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await taskAPI.addTask(formData);
      onAdd(response.data);
      setFormData({ title: '', description: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="add-task">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="add-task-btn">
          + Add New Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="add-task-form">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Task description (optional)"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="form-actions">
            <button type="submit" className="save-btn">Add Task</button>
            <button type="button" onClick={() => setIsOpen(false)} className="cancel-btn">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTask;
