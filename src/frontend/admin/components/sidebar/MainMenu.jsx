import MainMenuItem from "./MainMenuItem";

export default function MainMenu() {
    return (
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
            <ul className="flex flex-col pl-0 mb-0">
                <MainMenuItem title='Информация' link='dashboard' icon='fa-gauge' />
                <MainMenuItem title='Занятия' link='lessons' icon='fa-person-chalkboard' />
                <MainMenuItem title='Вопросы' link='questions' icon='fa-person-circle-question' />
                <MainMenuItem title='Студенты' link='students' icon='fa-graduation-cap' />
                <MainMenuItem title='Курсы' link='courses' icon='fa-building-columns' />
            </ul>
        </div>
    );
}