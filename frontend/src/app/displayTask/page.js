

'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";

export default function DisplayTask() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        setError("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${editTask.id}`, {
        priority: editTask.priority,
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
        due_date: editTask.due_date,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Task updated successfully");
      setEditTask(null);
      const updatedTasks = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(updatedTasks.data);
    } catch (error) {
      console.error("Error updating task:", error.message);
      setError("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Task deleted successfully");
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-cyan-700">
      <Toaster />
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.length === 0 ? (
          <p className="text-center col-span-full text-lg text-gray-600">
            No tasks available
          </p>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="bg-white max-w-lg mx-auto rounded-lg shadow-2xl p-6">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-800 uppercase underline">{task.title}</h3>
                <p className="text-sm text-green-500">{task.status}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{task.description}</p>
                <p className="text-sm font-bold mt-2 text-blue-500">Priority: {task.priority}</p>
                <p className="text-sm font-bold text-red-700">Due Date: {new Date(task.due_date).toISOString().split("T")[0]}</p>

                <div className="mt-4 flex justify-between">
                  <Button
                    className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => setEditTask(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-pink-600  00 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Task Modal */}
      {editTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Card className="bg-orange-200 max-w-lg mx-auto rounded-lg shadow-2xl p-6 w-[500px]">
            <CardHeader>
              <h3 className="text-2xl font-bold ">Edit Task</h3>
            </CardHeader>
            <form onSubmit={handleUpdateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Name:</label>
                <input
                  type="text"
                  name="title"
                  value={editTask.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 "
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={editTask.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700">Status:</label>
<select
  name="status"
  value={editTask.status}
  onChange={handleInputChange}
  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
  required
>
  <option value="">Select Status</option>
  <option value="Pending">Pending</option>
  <option value="Completed">Completed</option>
  <option value="In-Progress">In-Progress</option>
</select>
                {/* <label className="block text-sm font-medium text-gray-700">Status:</label>
                <input
                  type="text"
                  name="status"
                  value={editTask.status}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                /> */}
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700">Priority:</label>
<select
  name="priority"
  value={editTask.priority}
  onChange={handleInputChange}
  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
  required
>
  <option value="">Select Priority</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select>
                {/* <label className="block text-sm font-medium text-gray-700">Priority:</label>
                <input
                  type="text"
                  name="priority"
                  value={editTask.priority}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                /> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date:</label>
                <input
                  type="date"
                  name="due_date"
                  value={editTask.due_date}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <Button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                  onClick={() => setEditTask(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Update Task
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
