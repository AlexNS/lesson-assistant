import { useMatches } from "react-router-dom"
import BreadcrumbsEntry from "./BreadcrumbsEntry";

export default function Breadcrumbs() {
    const matches = useMatches();

    const markedMatches = matches.filter(m => m.handle);

    const bc = markedMatches
        .map(m => (<BreadcrumbsEntry handle={m.handle} pathname={m.pathname} />));

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