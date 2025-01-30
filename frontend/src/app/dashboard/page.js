'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Pie,Bar} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale, BarElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement,PointElement, Tooltip, Legend);

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // Calculate statistics
        const totalTasks = response.data.length;
        const pendingTasks = response.data.filter(
          (task) => task.status === 'Pending'
        ).length;
        const completedTasks = response.data.filter(
          (task) => task.status === 'Completed'
        ).length;

        setStats({
          completed: completedTasks,
          pending: pendingTasks,
          total: totalTasks,
        });
      } catch (error) {
        console.error('Error fetching task statistics:', error.message);
      }
    };

    fetchTaskStats();
  }, []);

  // Pie chart data for actual tasks
  const pieData = {
    labels: ['Completed', 'Pending', 'Total'],
    datasets: [
      {
        data: [stats.completed, stats.pending, stats.total],
        backgroundColor: ['#42A5F5', '#FFD54F', '#AB47BC' ],
        hoverBackgroundColor: ['#66BB6A','#FF7043' , '#EF5350'],
      },
    ],
  };

  // Dummy pie chart data
  const dummyPieData = {
    labels: ['No Data', 'No Data', 'No Data'],
    datasets: [
      {
        data: [1, 1, 1], // Equal dummy values
        backgroundColor: ['#64B5F6', '#FF8A65', '#BA68C8'],
        hoverBackgroundColor: [ '#4CAF50', '#FFC107', '#F44336'],
      },
    ],
  };
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
      label: 'Tasks Over Time',
      data: [15, 20, 10, 30, 25, 35, 40, 45],
      backgroundColor: '#4CAF50',
    }],
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 p-5  h-[750px] bg-gray-900 text-white p-5 flex flex-col  ">
       <marquee behaviour="alternate"> <h1 className="text-xl font-semibold text-gray-200 ">welcome</h1></marquee>
        <ul className="space-y-4">
          <button
            className="bg-pink-500 text-white p-2 w-full mt-4 rounded-md"
            onClick={() => router.push('/createTask')}
          >
            Create Task                            
          </button>

          <button
            className="bg-green-600 text-white p-2 w-full mt-4 rounded-md"
            onClick={() => router.push('/displayTask')}
          >
            Display Tasks
          </button>

    
        </ul>
      </div>

      {/* bg-gradient-to-r from-cyan-200 to-cyan-700 */}



      <main className="flex-1 p-6 bg-gray-300 h-[750px] ">
        


        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow ">
            <h2 className="text-lg font-bold  ">Total Tasks</h2>
            <p className="text-2xl  ">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded shadow ">
            <h2 className="text-lg font-bold">Pending Tasks</h2>
            <p className="text-2xl">{stats.pending}</p>
          </div>
          <div className="bg-white p-4 rounded shadow  ">
            <h2 className="text-lg font-bold">Completed Tasks</h2>
            <p className="text-2xl">{stats.completed}</p>
          </div>
        </div>


        <section className="grid grid-cols-2 gap-6 mt-6 ">
          <div className="p-6 bg-white rounded-lg shadow-md bg-gradient-to-r from-cyan-100 to-cyan-700">
            <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
            <Pie data={stats.total > 0 ? pieData : dummyPieData} />
            
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md bg-gradient-to-r from-rose-100 to-amber-200 ">
            <h2 className="text-xl font-semibold mb-4">This Year Growth</h2>
            <Bar data={barData} />
          </div>
        </section>

       
      </main>


    </div>  
    
  );
}







