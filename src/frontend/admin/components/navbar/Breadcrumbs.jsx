import { useMatches } from "react-router-dom"

export default function Breadcrumbs() {
    const matches = useMatches();

    const markedMatches = matches.filter(m => m.handle);

    const bc = markedMatches
        .map(m => {
            const title = m.handle.title;
            const link = m.pathname;
            return <li key={link} className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">{title}</li>
        });

    const title = markedMatches.length > 0 ? markedMatches[markedMatches.length - 1].handle.title : '';
    return (
        <nav>
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="text-sm leading-normal opacity-50 text-slate-700">
                Страницы
              </li>
              {bc}      
            </ol>

            <h6 className="mb-0 font-bold capitalize">{title}</h6>
            
        </nav>
    )
}