export default function Logo() {
    return (
        <div className="h-19.5">
            <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"></i>
            <a className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"  target="_blank">
            {/* <img src="./assets/img/logo-ct.png" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" /> */}
            <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Lesson Assistant</span>
            </a>
        </div>
    );
}