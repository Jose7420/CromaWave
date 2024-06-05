
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


const Show = ({ auth, carrito }) => {
    console.table(carrito.data);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                <Link href={route('carritos.index')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >   Carritos</Link>
                -&gt; Procuctos</h2>}
        >
            <Head title="Producto" />
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {carrito.data.productos.map((carritoproductos) => (
                                <div key={carritoproductos.id} className="bg-gray-100 p-6 rounded-md shadow-md">
                                    <img src={carritoproductos.imagen} alt={carritoproductos.nombre} className="w-full h-[200px] object-cover mb-4 rounded-xl" />
                                    <h3 className="text-lg font-semibold">Prducto: {carritoproductos.nombre}</h3>

                                    <p className="text-gray-600"><strong>Descripción: </strong>{carritoproductos.descripcion}</p>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );


}

export default Show;
