import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900">You're logged in!</div> */}
                        <div className="flex lg:justify-center lg:col-start-2"><img type="img/png" src="/img/CromaWaveSinFondo.png" alt="Logo"/></div>
                        <img src="/img/grocery-list.jpg" alt="" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
