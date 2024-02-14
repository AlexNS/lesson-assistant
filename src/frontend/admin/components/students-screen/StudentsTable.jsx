import { useFetchStudentsQuery } from "../../features/students/students-api-slice";
import { getFullName } from "../../utils/full-name";

export default function StudentsTable() {

    const { data = [], isFetching } = useFetchStudentsQuery();

    const students = data.map(s => {
        return <tr key={s.id}>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                <div className="flex px-2 py-1">
                    <div>
                        <img src={`/p/${s.photo}`} className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl" alt="user1" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h6 className="mb-0 text-sm leading-normal">{getFullName(s)}</h6>
                        <p className="mb-0 text-xs leading-tight text-slate-400">{s.email}</p>
                    </div>
                </div>
            </td>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent"></td>
        </tr>
    });

    return (
        <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                        <tr>
                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                Студент
                            </th>
                            <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


