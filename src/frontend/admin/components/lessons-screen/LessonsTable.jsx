import { useNavigate } from "react-router-dom";
import { useFetchLessonsQuery } from "../../features/lessons/lessons-api-slice";
import { format } from 'date-fns';

export default function LessonsTable() {
    const { data = [], isFetching } = useFetchLessonsQuery();
    const navigate = useNavigate();
    
    const formatDate = (date) => format(date, 'dd.MM.yyyy hh:mm');
    const navigateToAttendance = (e) => navigate(`/admin/lessons/${e.target.getAttribute('lessonId')}/attendance`); 
    
    const lessons = data.map(l => {
        return <tr key={l.id}>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                {l.title}
            </td>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                {formatDate(l.date)}
            </td>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                <button onClick={navigateToAttendance} lessonId={l.id} className="btn-primary mb-0">
                    Посещение
                </button>
            </td>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                <div className="flex flex-row gap-2">
                    <button>
                        <i className="fa fa-edit" /> 
                    </button>
                    <button>
                        <i className="fa fa-trash" /> 
                    </button>
                </div>
                
            </td>
        </tr>
    });

    console.log(lessons);

    return (
        <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                        <tr>
                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                Название
                            </th>
                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                Дата
                            </th>
                            <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                            <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


