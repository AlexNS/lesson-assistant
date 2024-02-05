import MainMenuItem from "./MainMenuItem";

export default function MainMenu() {
    return (
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
            <ul className="flex flex-col pl-0 mb-0">
                <MainMenuItem title='Информация' link='dashboard' />
                <MainMenuItem title='Занятия' link='lessons' />
                <MainMenuItem title='Студенты' link='students' />
                <MainMenuItem title='Курсы' link='courses' />
            </ul>
        </div>
    );
}