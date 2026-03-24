import React, { useState, useEffect } from 'react';
import { ListTodo, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { taskService } from '../services/api';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  subtasks?: Task[];
}

export const TaskDumpyard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await taskService.getTasks();
    // Handle MongoDB _id to id conversion
    const formattedTasks = data.map((task: any) => ({
      ...task,
      id: task._id || task.id
    }));
    setTasks(formattedTasks);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    const task = {
      title: newTask,
      priority,
      status: 'pending',
      subtasks: [],
    };

    const savedTask = await taskService.createTask(task);
    const formattedTask = {
      ...savedTask,
      id: savedTask._id || savedTask.id
    };
    setTasks([...tasks, formattedTask]);
    setNewTask('');
    toast.success('Task added! 📝');
  };

  const toggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const updated = await taskService.updateTask(taskId, { status: newStatus });
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const deleteTask = async (taskId: string) => {
    await taskService.deleteTask(taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.success('Task deleted');
  };

  const toggleExpand = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const priorityColors = {
    high: 'border-l-4 border-red-400 bg-red-50 dark:bg-red-900/10',
    medium: 'border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10',
    low: 'border-l-4 border-green-400 bg-green-50 dark:bg-green-900/10',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ListTodo className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg">Task Dumpyard</h3>
      </div>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="What needs to be done?"
          className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="flex-1 px-4 py-2 rounded-2xl bg-gray-50 dark:bg-gray-700 border-0"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-2xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id} className={`rounded-2xl p-4 ${priorityColors[task.priority]}`}>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={() => toggleTask(task.id)}
                className="mt-1 w-5 h-5 rounded cursor-pointer"
              />
              
              <div className="flex-1">
                <p className={`${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
                  {task.title}
                </p>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>No tasks yet. Start dumping your thoughts! 💭</p>
        </div>
      )}
    </div>
  );
};
