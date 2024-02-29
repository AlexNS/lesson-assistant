import { useParams } from "react-router-dom";
import { useCreateLessonAttendanceFormMutation, useDisableLessonAttendanceFormMutation, useEnableLessonAttendanceFormMutation, useFetchLessonAttendanceFormInfoQuery } from '../../features/attendance/attendance-api-slice';

export default function LessonScreenAttendanceQr() {
    const { id: lessonId } = useParams();

    const { data: lessonFormInfo = null } = useFetchLessonAttendanceFormInfoQuery(lessonId);
    const [ createLessonAttendanceForm, { isLoading: isAttendanceFormCreating } ] = useCreateLessonAttendanceFormMutation();
    const [ disableLessonAttendanceForm ] = useDisableLessonAttendanceFormMutation();
    const [ enableLessonAttendanceForm ] = useEnableLessonAttendanceFormMutation()

    const handleFormCreate = () => {
        if (isAttendanceFormCreating) {
            return;
        }
        createLessonAttendanceForm(lessonId)
    };

    const handleDisable = () => {
        disableLessonAttendanceForm(lessonId)
    }

    const handleEnable = () => {
        enableLessonAttendanceForm(lessonId)
    }

    return (
        <>
            <div className="flex flex-row justify-end">
                {
                    !lessonFormInfo ? 
                        <button className="btn-primary mr-1" onClick={handleFormCreate}>Создать</button> :
                        <></>
                }
                {
                    lessonFormInfo?.active ? 
                        <button className="btn-primary mr-1" onClick={handleDisable}>Отключить</button> :
                        <></>
                }
                {
                    lessonFormInfo && !lessonFormInfo.active ? 
                        <button className="btn-primary mr-1" onClick={handleEnable}>Вкюлючить</button> :
                        <></>
                }
            </div>
            <div>
                {   
                    lessonFormInfo ? 
                        <img className="max-h-lvh " src={lessonFormInfo.qrPath.replace('uploads', '/p')} /> :
                        <></>
                }   
            </div>
        </>
    );
}