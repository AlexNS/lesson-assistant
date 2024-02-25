import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { useAddLessonAttendanceMutation } from '../../features/attendance/attendance-api-slice';
import { useGoBack } from '../../utils/go-back';

export default function LessonScreenAttendanceManual() {
    const { id: lessonId } = useParams();
    
    const [ createLessonAttendance, { isLoading } ] = useAddLessonAttendanceMutation();

    const goBack = useGoBack();
    const returnBack = () => goBack({fallBack: '/admin/lessons'});
    
    const dt = format(new Date(), "yyyy-MM-dd'T'hh:mm");

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
          email: '',
        },
      })

    const onSubmit = async (data) =>{
        if (isLoading) {
            return
        }
        await createLessonAttendance({
            email: data.email,
            lessonId
        }).unwrap();
        reset({
           email: ''
        });

        returnBack();
    } 
    
     return (
        <form id="lesson-form" onSubmit={handleSubmit(onSubmit)}>
            <div
                className="relative flex flex-col break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border m-4 p-8 max-w-lg"
            >
                <input
                    type="email"
                    className="default-input mb-4"
                    placeholder="Email"
                    required
                    {...register("email")}
                />

                <button type="submit" className="btn-primary" disabled={isLoading}>Отметить</button>
                <button onClick={returnBack}>Отмена</button>
            </div>
        </form>
    );
}