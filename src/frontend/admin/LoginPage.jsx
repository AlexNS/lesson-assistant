import { useState } from "react";
import backImage from './assets/curved6.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "./features/auth/authSliceActions";

export default function LoginPage() {
    const { pending } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            dispatch(loginUser({
                login: input.username,
                password: input.password
            }))
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <main className="mt-0 transition-all duration-200 ease-soft-in-out">
            <section>
                <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
                    <div className="container z-10">
                        <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                                <div className="absolute top-0 w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                                    <div className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10" style={{backgroundImage: `url('${backImage}')`}}></div>
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-0 -mx-3">
                            <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                                <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                                    <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                                        <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Lesson Assistant</h3>
                                        <p className="mb-0">Вход в админку</p>
                                        <p className="mb-0">Нужен логин и пароль</p>
                                    </div>
                                    <div className="flex-auto p-6">
                                        <form role="form" onSubmit={handleSubmitEvent}>
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Логин</label>
                                            <div className="mb-4">
                                                <input type="text" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                 placeholder="Логин" aria-label="Логин" aria-describedby="email-addon" name="username" onChange={handleInput} />
                                            </div>
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Пароль</label>
                                            <div className="mb-4">
                                                <input type="password" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                placeholder="Пароль" aria-label="Пароль" aria-describedby="password-addon" name="password" onChange={handleInput}/>
                                            </div>
                                            <div className="min-h-6 mb-0.5 block pl-12">
                                                <input id="rememberMe" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" 
                                                type="checkbox" checked={rememberMe} name="rememberMe" onChange={()=>setRememberMe(!rememberMe)} />
                                                <label className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700" htmlFor="rememberMe">Запомнить меня</label>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                                                    disabled={pending}>
                                                    Вход
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}