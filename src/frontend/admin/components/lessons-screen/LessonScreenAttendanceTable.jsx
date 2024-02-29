import { useParams } from "react-router-dom";
import { useFetchLessonAttendanceQuery } from "../../features/attendance/attendance-api-slice";
import { getFullName } from "../../utils/full-name";
import { format } from 'date-fns';
import { NavLink } from "react-router-dom";

export default function LessonScreenAttendanceTable() {
    const { id } = useParams();

    const { data = [] } = useFetchLessonAttendanceQuery(id);
    const formatDate = (date) => format(date, 'dd.MM.yyyy hh:mm:ss');

    const attendanceRecords = data.map(a => (
        <tr>
          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
            {getFullName(a.student)}
          </td>
          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
            {formatDate(a.createdAt)}
          </td>
          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
            {a.visitorId} 
          </td>
          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
            {a.geoData}
          </td>
        </tr>
    ))

    
    return (
        <>   
            <div className="flex flex-row justify-end">
                <NavLink to='manual' className="btn-primary mr-1">Отметить вручную</NavLink>
                <NavLink to='qr' className="btn-primary mr-1">QR Код</NavLink>
            </div>
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
                    {attendanceRecords}
                </tbody>
            </table>
        </>
    );
}