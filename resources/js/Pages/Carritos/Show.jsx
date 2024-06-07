
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";

import Modal from "@/Components/Modal";
import { useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";


const Show = ({ auth, carrito }) => {

    console.log("dentro de show carrito");
    console.log(carrito.data.productos.length);
    // console.log(carrito.data);
    const propietario = carrito.data.propietario.name;

    const [modal, setModal] = useState(false);

    const { reset, data, setData, delete: destroy, processing, errors } = useForm({
        id: '',
        nombre: '',

    });

    const openModal = (id, nombre) => {
        console.log("dentro del openModal " + id);
        setModal(true);
        setData({ 'id': id, 'nombre': nombre });

    };

    const closeModal = () => {
        setModal(false);
        reset();
    };

    const eliminarProducto = (e) => {
        console.log(data.id);

        destroy(route('carrito_producto.destroy', data.id), {

            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };


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
                        {carrito.data.productos.length === 0 ?
                            <div className="p-6 text-gray-900 ">
                                <div className="bg-gray-100   p-6 rounded-md shadow-md flex text-center justify-center items-center mx-auto ">
                                    <h3 className="text-lg font-semibold">No hay productos en el carrito</h3>
                                </div>
                            </div>
                            :
                            <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                                {carrito.data.carrito_productos.map((carrito_producto) => {
                                    const producto = carrito.data.productos.find((p) => p.id === carrito_producto.producto_id);
                                    return producto && (
                                        <div key={carrito_producto.id} className="bg-gray-100 p-6 rounded-md shadow-md">

                                            <img src={producto.imagen} alt={producto.nombre} className="w-full h-[200px] object-cover mb-4 rounded-xl" />
                                            <h3 className="text-lg font-semibold">Prducto: {producto.id}</h3>
                                            <p className="text-gray-600"><strong>Precio: </strong>{producto.precio}</p>
                                            <p className="text-gray-600"><strong>Propietario: </strong>{propietario}</p>
                                            <p className="text-gray-600"><strong>Cantidad: </strong>{carrito_producto.cantidad}</p>
                                            <div className=" object-none h-40 w-96">
                                                <p className="text-gray-600"><strong>Descripción: </strong>{producto.descripcion}</p>
                                            </div>

                                            <DangerButton onClick={() => openModal(carrito_producto.id, producto.nombre)} disabled={processing} className="ml-9">
                                                Eliminar
                                            </DangerButton>

                                        </div>
                                    )
                                })

                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

            <Modal show={modal} onClose={closeModal} maxWidth="sm">
                <div className="p-6">
                    <h3 className="text-lg font-semibold">Eliminar producto</h3>
                    <p className="text-gray-600">¿Estás seguro de eliminar el producto ? <strong>{data.nombre}</strong></p>

                    <div className="mt-6 flex justify-end space-x-4">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton onClick={eliminarProducto} processing={processing}>Eliminar</DangerButton>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );


}

export default Show;
