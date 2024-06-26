import { NavLink } from "react-router-dom";

export default function MainMenuItem({title, icon, link}) {
    const cl = ({isActive}) => isActive ? 
        "py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors":
        "py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"

    const iconClass = `fa ${icon ? icon : 'fa-user'} text-white`;
        
    return (
        <li className="mt-0.5 w-full">
            <NavLink to={link} className={cl}>
                <div className="bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center">
                 <i className={iconClass}></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">{title.toString()}</span>
            </NavLink>
        </li>
    );
}