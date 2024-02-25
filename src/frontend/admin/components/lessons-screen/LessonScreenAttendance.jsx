import { Outlet } from "react-router-dom";

export default function LessonScreenAttendance() {
       
    return (
        <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
                <Outlet/>
            </div>
        </div>
    );
}