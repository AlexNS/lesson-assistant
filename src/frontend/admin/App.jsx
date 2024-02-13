import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import DashboardScreen from "./components/dashboard-screen/DashboardScreen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from './AdminPage';
import LessonsScreen from './components/lessons-screen/LessonsScreen';
import CoursesScreen from './components/courses-screen/CoursesScreen';
import StudentsScreen from './components/students-screen/StudentsScreen';

export default function App() {
  const { userToken } = useSelector((state) => state.auth);

  if (!userToken) {
    return ( 
      <LoginPage/>
    );
  }

  const router = createBrowserRouter([
    {
        path: "/frontend-admin.html/",
        element: <AdminPage />,
        children: [
          {
            path: "dashboard",
            element: <DashboardScreen />,
            handle: {
              title: 'Информация'
            }
          },
          {
            path: "lessons",
            element: <LessonsScreen />,
            handle: {
              title: 'Занятия'
            }
          },
          {
            path: "courses",
            element: <CoursesScreen />,
            handle: {
              title: 'Курсы'
            }
          },
          {
            path: "students",
            element: <StudentsScreen />,
            handle: {
              title: 'Студенты'
            }
          },
        ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
