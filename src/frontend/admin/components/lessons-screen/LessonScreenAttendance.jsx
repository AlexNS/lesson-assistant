import { useParams } from "react-router-dom";
import { useFetchLessonAttendanceQuery } from "../../features/attendance/attendance-api-slice";

export default function LessonScreenAttendance() {
    const { id } = useParams();

    const { data = [] } = useFetchLessonAttendanceQuery(id);

    const lessons = [];
    
    return (
        <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                        <tr>
                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                ФИО
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