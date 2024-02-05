import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
    

    return (
       <>
        <Sidebar />
        <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
            <Navbar />
            <div className="w-full px-6 py-6 mx-auto">
                <Outlet />
            </div>
        </main>
       </>
    );
}