import { useParams } from "react-router-dom"
import { useGetLessonQuery } from "../../features/lessons/lessons-api-slice";

export default function BreadcrumbsEntry({handle, pathname}) {
    let title = handle.title;
    const link = pathname;
    
    const { id } = useParams();
    const { data: lessonData } = useGetLessonQuery(id, {skip: !handle.isLesson});

    if (lessonData) {
        title = lessonData?.title ?? '';
    }

    return (
        <li key={link} className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" 
            aria-current="page">
                {title}
        </li>
    )
}