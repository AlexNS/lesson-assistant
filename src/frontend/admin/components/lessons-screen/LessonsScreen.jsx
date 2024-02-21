import LessonsTable from "./LessonsTable";
import { NavLink } from "react-router-dom";

export default function LessonsScreen() {
    return (
        <>
            <div className="flex flex-row justify-end">
                <NavLink to='create' className="btn-primary">Создать</NavLink>
            </div>
            <LessonsTable />
        </>
    );
}