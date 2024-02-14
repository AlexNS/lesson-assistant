import { useSelector, useDispatch } from 'react-redux';
import Breadcrumbs from "./Breadcrumbs";
import { logoutUser } from '../../features/auth/auth-slice-actions';
import { getFullName } from '../../utils/full-name';

export default function Navbar() {
    const { userInfo } = useSelector((state) => state.auth);
    const fullname = getFullName(userInfo);

    const dispatch = useDispatch();

    function handleOnLogoutClick() {
      dispatch(logoutUser());
    }

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start" 
            navbar-scroll="true">
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <Breadcrumbs /> 
          <div className="flex items-center justify-end mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                <li className="flex items-center">
                  <a className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500">
                    <i className="fa fa-user sm:mr-1 text-slate-500"></i>
                    <span className="sm:inline">{fullname}</span>
                  </a>
                </li>
                <li className="flex items-center">
                  <a onClick={handleOnLogoutClick} className="cursor-pointer block ml-10 px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500">
                    <i className="fa fa-arrow-right-from-bracket sm:mr-1 text-slate-500"></i>
                    <span className="sm:inline">Выход</span>
                  </a>
                </li>
              </ul>
          </div>
        </div>
      </nav>
    );
}