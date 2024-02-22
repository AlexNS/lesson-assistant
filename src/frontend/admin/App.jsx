import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import DashboardScreen from "./components/dashboard-screen/DashboardScreen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from './AdminPage';
import LessonsScreen from './components/lessons-screen/LessonsScreen';
import CoursesScreen from './components/courses-screen/CoursesScreen';
import StudentsScreen from './components/students-screen/StudentsScreen';
import QuestionsScreen from './components/questions-screen/QuestionsScreen';
import LessonScreenCreate from './components/lessons-screen/LessonScreenCreate';
import LessonScreenAttendance from './components/lessons-screen/LessonScreenAttendance';

export default function App() {
  const { userToken } = useSelector((state) => state.auth);

  if (!userToken) {
    return ( 
      <LoginPage/>
    );
  }

  const router = createBrowserRouter([
    {
        path: "/admin",
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
            handle: {
              title: 'Занятия'
            },
            children: [
              {
                path: '',
                element: <LessonsScreen />,
              },
              {
                path: "create",
                element: <LessonScreenCreate />,
                handle: {
                  title: 'Создание занятия'
                }
              }
            ]
          },
          {
            path: "lessons/:id",
            handle: {
              isLesson: true,
            },
            children: [
              {
                path: 'attendance',
                element: <LessonScreenAttendance />,
                handle: {
                  title: 'Посещение'
                }
              }
            ]
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
          {
            path: "questions",
            element: <QuestionsScreen />,
            handle: {
              title: 'Вопросы'
            }
          },
        ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
