
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


const Show = ({ auth,producto }) => {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Producto</h2>}
        >
            <Head title="Producto" />
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div key={producto.data.id} className="bg-gray-100 p-6 rounded-md shadow-md">


                                <img src={producto.data.imagen} alt={producto.data.nombre} className="w-full h-[200px] object-cover mb-4 rounded-xl" />
                                <h3 className="text-lg font-semibold">Nombre: {producto.data.nombre}</h3>
                                <p className="text-gray-600">id: {producto.data.id}</p>
                                <p className="text-gray-600">Precio: {producto.data.precio}</p>
                                <p className="text-gray-600">Descripción: {producto.data.descripcion}</p>
                            </div>

                            <Link
                                        href={route('productos.edit', producto.data.id)}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    > <i className="fa-solid fa-edit text-red-600"></i>Editar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );


}

export default Show;
