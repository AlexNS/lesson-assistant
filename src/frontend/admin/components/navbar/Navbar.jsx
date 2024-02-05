import Breadcrumbs from "./Breadcrumbs";

export default function Navbar() {
    return (
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start" 
            navbar-scroll="true">
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <Breadcrumbs />
        </div>
      </nav>
    );
}