'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export default function CreateTask() {
  const router = useRouter();
  const [error, setError] = useState('');
 const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    due_date: '',
    status: 'Pending',
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Task created successfully');
      setNewTask({
        title: '',
        description: '',
        priority: 'Medium',
        due_date: '',
        status: 'Pending',
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setShowModal(true); // Show modal for role restriction
      } else {
        console.error('Error creating task:', error.message);
        setError('Failed to create task');
      }
    }
  };
  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex justify-center items-center p-6 ">

        <Card className="shadow-xl bg-white w-[500px]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800">Create Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTask} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-black-600 mb-1">
                  Task Title
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={handleInputChange}
                   className="text-black-700"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-black-600 mb-1">
                  Task Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter task description"
                  value={newTask.description}
                  onChange={handleInputChange}
                   className="text-black-700"
                />
              </div>

              <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-black-600 mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={newTask.due_date}
                  onChange={handleInputChange}
                   className="text-black-700"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-black-600 mb-1">
                  Task Status
                </label>
                <Select
                  onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                  defaultValue={newTask.status}
                >
                  <SelectTrigger className="bg-green-100 text-green-800 hover:bg-green-200 ">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending"  className="hover:bg-green-500 focus:bg-green-500 bg-green-100 text-black">Pending</SelectItem>
                    <SelectItem value="Completed"  className="hover:bg-green-500 focus:bg-green-500 bg-green-100 text-black">Completed</SelectItem>
                    <SelectItem value="In-Progress"  className="hover:bg-green-500 focus:bg-green-500 bg-green-100 text-black">In-progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-black-600 mb-1">
                  Task Priority
                </label>
                <Select
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  defaultValue={newTask.priority}
                >
                  <SelectTrigger className="bg-green-100 text-green-800 hover:bg-green-200">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High"  className="hover:bg-green-500 focus:bg-green-500 bg-green-100 text-black">High</SelectItem>
                    <SelectItem value="Medium"  className="hover:bg-green-500 focus:bg-green-500 bg-green-100 text-black">Medium</SelectItem>
                    <SelectItem value="Low"  className="hover:bg-green-500 focus:bg-green-500 bg-green-100 text-black">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Create Task
              </Button>
            </form>

            <div className="mt-4">
              <Button onClick={goToDashboard} className="w-full bg-gray-500 hover:bg-gray-600">
                Go to Dashboard
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </CardContent>
        </Card>
 
    </div>
  );
}


