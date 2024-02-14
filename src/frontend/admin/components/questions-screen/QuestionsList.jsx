import { useFetchQuestionsQuery } from "../../features/questions/questions-api-slice";

export default function QuestionsList() {
    const { data = [], isFetching } = useFetchQuestionsQuery();

    const questionsList = data.map(q => {
        return (
            <div class="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                <h6 class="mb-0 font-semibold leading-normal text-sm text-slate-700">{q.text}</h6>
                <p class="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">{q.createdAt}</p>
            </div>
        );
    })

    return (
        <div class="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
            <div class="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div class="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                </div>
                <div class="flex-auto p-4">
                    {questionsList}
                </div>
            </div>
        </div>
    );
}

