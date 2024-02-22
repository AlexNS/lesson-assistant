import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useAddLessonMutation } from '../../features/lessons/lessons-api-slice';
import { useFetchCoursesQuery } from '../../features/courses/courses-api-slice';
import { useGoBack } from '../../utils/go-back';

export default function LessonScreenCreate() {
    const { data: coursesData  = [] } = useFetchCoursesQuery();
    const [ createLesson, { isLoading } ] = useAddLessonMutation();

    const goBack = useGoBack();
    const returnBack = () => goBack({fallBack: '/admin/lessons'});
    
    const dt = format(new Date(), "yyyy-MM-dd'T'hh:mm");

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
          title: '',
          date: dt,
          course: 0
        },
      })

    const onSubmit = async (data) =>{
        if (isLoading) {
            return
        }
        await createLesson(data).unwrap();
        reset({
            title: '',
            date: dt,
            course: 0
        });

        returnBack();
    } 
    
    const courses = coursesData?.map(c => (
        <option value={c.id}>{c.name}</option>
    ));

    return (
        <form id="lesson-form" onSubmit={handleSubmit(onSubmit)}>
            <div
                className="relative flex flex-col break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border m-4 p-8 max-w-lg"
            >
                <h1 className="mb-6">Создание занятия</h1>

                <input
                    type="text"
                    className="default-input mb-4"
                    placeholder="Название"
                    required
                    {...register("title")}
                />

                <input
                    type="datetime-local"
                    className="default-input mb-4"
                    placeholder="Дата"
                    required
                    {...register("date")}
                />

                <select className="default-input mb-4" {...register("course", {min: 1})}>
                    <option value={0}>-- Курс --</option>
                    {courses}
                </select>

                <button type="submit" className="btn-primary" disabled={isLoading}>Создать</button>
                <button onClick={returnBack} >Отмена</button>
            </div>
        </form>
    );
}