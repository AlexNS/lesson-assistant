import { useAddLessonMutation } from "../../features/lessons/lessons-api-slice";
import { useState } from 'react';

export default function LessonScreenCreate() {

    const [ createLesson, result ] = useAddLessonMutation();
    const [ title, setTitle ] = useState('');
    const [ date, setDate ] = useState(new Date());

    const handleCreateLesson = () => {
        createLesson({title, date});
    }

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDateChange = (e) => setDate(e.target.value);

    return (
        <form id="lesson-form">
            <div
                class="relative flex flex-col break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border m-4 p-8 max-w-lg"
            >
                <h1 class="mb-6">Создание занятия</h1>

                <input
                    type="text"
                    class="default-input mb-4"
                    placeholder="Название"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                />

                <input
                    type="datetime-local"
                    class="default-input mb-4"
                    placeholder="Дата"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                />

                <button type="button" class="btn-primary" onClick={handleCreateLesson}>Создать</button>
            </div>
        </form>
    );
}