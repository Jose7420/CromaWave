
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


const Show = ({ auth,carrito_productos }) => {

    console.log("dentro de show carito_producto");
    // console.log(carrito_productos.data[0].carrito.nombre);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Carrito {carrito_productos.data[0].carrito.nombre}</h2>}
        >
            <Head title="Producto" />
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {carrito_productos.data.map((carritoproductos) => (
                                <div key={carritoproductos.id} className="bg-gray-100 p-6 rounded-md shadow-md">
                                    {/* <Link
                                        href={route('carrito_productos.show', carritoproductos.id)}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    > */}
                                        <h3 className="text-lg font-semibold">Prducto: {carritoproductos.producto.nombre}</h3>

                                        <p className="text-gray-600"><strong>Descripción: </strong>{carritoproductos.producto.descripcion}</p>
                                    {/* </Link> */}
                                    {/* <DangerButton onClick={() => openModal(carritoproductos.id)} >  Eliminar</DangerButton> */}
                                </div>
                            ))}

                            {/* <Link
                                        href={route('carrito_producto.edit', carrito_productos.data.id)}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    > <i className="fa-solid fa-edit text-red-600"></i>Editar</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );


}

export default Show;
