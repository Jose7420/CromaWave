
import { Head, Link, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import EditButton from "@/Components/EditButton";
// import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";


const Index = ({ auth, productos }) => {
    console.log(productos.current_page);

    const [currentPage, setCurrentPage] = useState(productos.current_page);
    const [modal, setModal] = useState(false);
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
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


    const handlePageChange = (newPage) => {
        router.visit(`/productos?page=${newPage}`);
        setCurrentPage(newPage);
    };


    const eliminarProducto = (e) => {
        console.log(data.id);



        destroy(route('productos.destroy', data.id), {
            // preserveScroll: true,
            onSuccess: () => closeModal(),
            // onFinish: () => reset(),
        });
    };



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Productos</h2>}
        >
            <Head title="Productos" />
            <div className="py-12">
                <div className="mb-9 flex justify-center">
                    <PrimaryButton>
                        <Link href={route('productos.create')}>Agregar Producto</Link>
                    </PrimaryButton>

                </div>
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {productos.data.map((producto) => (
                                <div key={producto.id} className="bg-gray-100 p-6 rounded-md shadow-md">

                                    <img src={producto.imagen} alt="imagen del producto" className="w-full h-[200px] object-cover mb-4 rounded-xl" />
                                    <h3 className="text-lg font-semibold">Nombre: {producto.nombre}</h3>
                                    <p className="text-gray-600">id: {producto.id}</p>
                                    <p className="text-gray-600">Precio: {producto.precio}</p>
                                    <div className=" object-none h-40 w-96">
                                        <p className="text-gray-600">Descripción: {producto.descripcion}</p>
                                    </div>
                                    {/* <Link
                                        href={route('productos.show', producto.id)}

                                    > Show</Link> */}

                                    <div className="flex justify-around ">

                                        <EditButton className="">  <Link
                                            href={route('productos.edit', producto)}
                                        > <i className="fa-solid fa-edit text-red-600"></i>Editar</Link>
                                        </EditButton>
                                        <EditButton>
                                            <Link href={route('carrito_producto.create', producto)}>Agregar al carrito</Link>
                                        </EditButton>

                                        <DangerButton onClick={() => openModal(producto.id, producto.nombre)} className="ml-9">
                                            Eliminar
                                        </DangerButton>


                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="flex justify-around m-4 ">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <button className=" btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === productos.last_page}>
                                <i className="fas fa-arrow-circle-down"></i> Siguiente
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            {/* <div className="flex justify-between ">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === productos.last_page}>
                    Next
                </button>
            </div> */}

            <Modal show={modal} onClose={closeModal}>
                <form onSubmit={eliminarProducto} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estás seguro de que quieres eliminar el producto? {data.nombre} del usuario { }
                    </h2>
                    {/*
                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p> */}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Eliminar
                        </DangerButton>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );

}

export default Index;


