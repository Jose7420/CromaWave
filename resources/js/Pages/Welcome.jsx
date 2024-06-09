import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">

                            <div className="flex lg:justify-center lg:col-start-2">

                                <img type="img/png" src="/img/CromaWaveSinFondo.png" alt="Logo" />


                            </div>

                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>

                        </header>


                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <div>
                                    <div
                                        id="screenshot-container"

                                        className="flex flex-col items-start gap-6 lg:col-start-2 lg:row-start-1 lg:col-span-1"
                                    >
                                        <img
                                            src="/img/grocery-list.jpg"
                                            alt=""

                                        />
                                        <h2 className="text-xl font-bold text-black dark:text-white">
                                            Lista de la compra
                                        </h2>

                                        <p className=" text-sm/relaxed text-black">
                                            Un Sitio donde podre ogarnizar las Lista de la compra
                                        </p>

                                    </div>

                                </div>
                                <div className="flex flex-col items-start gap-6 lg:col-start-2 lg:row-start-1 lg:col-span-1">

                                    <img src="/img/shirts.jpg" alt="" />
                                    <h2 className="text-xl font-bold text-black dark:text-white">Un Sitio donde puedes ver tus lista</h2>

                                    <p className=" text-sm/relaxed text-black">
                                        En este sitio podras ver tus lista de la compra y poder organizarlas
                                    </p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
