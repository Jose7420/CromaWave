
import { Head, Link, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
// import Swal from "sweetalert2";
import Modal from "@/Components/Modal";


const Index = ({ auth, carrito_productos }) => {
    // console.log(carrito_productos.current_page);
    console.table(carrito_productos.data);

    // const [currentPage, setCurrentPage] = useState(carrito_productos.current_page);
    // const [modal, setModal] = useState(false);
    // const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    // const { reset, data, setData, delete: destroy, processing, errors } = useForm({
    //     id: '',
    // });

    // const openModal = (id) => {
    //     console.log("dentro del openModal " + id);
    //     setModal(true);
    //     setData('id', id);

    // };

    // const closeModal = () => {
    //     setModal(false);
    //     reset();
    // };


    // const handlePageChange = (newPage) => {
    //     router.visit(`/productos?page=${newPage}`);
    //     setCurrentPage(newPage);
    // };


    // const eliminarProducto = (e) => {



    //     destroy(route('productos.destroy', data.id), {
    //         // preserveScroll: true,
    //         onSuccess: () => closeModal(),
    //         // onFinish: () => reset(),
    //     });
    // };



    return (
        // <AuthenticatedLayout
        //     user={auth.user}
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Productos</h2>}
        // >
        //     <Head title="Productos" />
        //     <div className="py-12">
        //         <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
        //             <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        //                 <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        //                     {productos.data.map((producto) => (
        //                         <div key={producto.id} className="bg-gray-100 p-6 rounded-md shadow-md">
        //                             <Link
        //                                 href={route('productos.show', producto.id)}
        //                                 className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
        //                             >


        //                                 <img src={producto.imagen} alt={producto.nombre} className="w-full h-[200px] object-cover mb-4 rounded-xl" />
        //                                 <h3 className="text-lg font-semibold">Nombre: {producto.nombre}</h3>
        //                                 <p className="text-gray-600">id: {producto.id}</p>
        //                                 <p className="text-gray-600">Precio: {producto.precio}</p>
        //                                 <p className="text-gray-600">Descripción: {producto.descripcion}</p>

        //                             </Link>
        //                             <DangerButton onClick={() => openModal(producto.id)} >  Eliminar</DangerButton>
        //                         </div>
        //                     ))}
        //                 </div>
        //                 <div className="flex justify-around m-4 ">
        //                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        //                         Anterior
        //                     </button>
        //                     <button className=" btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === productos.last_page}>
        //                         <i className="fas fa-arrow-circle-down"></i> Siguiente
        //                     </button>
        //                 </div>
        //             </div>

        //         </div>

        //     </div>

        //     {/* <div className="flex justify-between ">
        //         <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        //             Previous
        //         </button>
        //         <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === productos.last_page}>
        //             Next
        //         </button>
        //     </div> */}

        //     <Modal show={modal} onClose={closeModal}>
        //         <form onSubmit={eliminarProducto} className="p-6">
        //             <h2 className="text-lg font-medium text-gray-900">
        //                 ¿Estás seguro de que quieres eliminar el producto? {data.id} del usuario {auth.user.id}
        //             </h2>
        //             {/*
        //             <p className="mt-1 text-sm text-gray-600">
        //                 Once your account is deleted, all of its resources and data will be permanently deleted. Please
        //                 enter your password to confirm you would like to permanently delete your account.
        //             </p> */}

        //             <div className="mt-6 flex justify-end">
        //                 <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

        //                 <DangerButton className="ms-3" disabled={processing}>
        //                     Eliminar
        //                 </DangerButton>
        //             </div>
        //         </form>
        //     </Modal>

        // </AuthenticatedLayout>

        // <AuthenticatedLayout
        //     user={auth.user}
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Carritos</h2>}
        // >
        //     <Head title="Carritos" />
        //     <div className="py-12">
        //         <table>
        //             <thead>
        //                 <tr>
        //                     <th>id</th>
        //                     <th>Nombre</th>
        //                     <th>Producto</th>

        //                     <th>Acciones</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {carrito_productos.data.map((carritoproductos) => (
        //                     <tr key={carritoproductos.id}>
        //                         <td>{carritoproductos.id}</td>
        //                         <td>{carritoproductos.nombre}</td>
        //                         <td>{carritoproductos.producto.nombre}</td>

        //                         {/* <td>
        //                             <DangerButton onClick={() => openModal(carritoproductos.id)} >  Eliminar</DangerButton>
        //                         </td> */}
        //                     </tr>
        //                 ))}
        //             </tbody>

        //         </table>
        //     </div>

        // </AuthenticatedLayout>

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Carritos</h2>}
        >
            <Head title="Carritos" />
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
                                        <h3 className="text-lg font-semibold">Nombre: {carritoproductos.carrito.nombre}</h3>
                                        <p className="text-gray-600">id: {carritoproductos.id}</p>
                                        <p className="text-gray-600">Producto: {carritoproductos.producto.nombre}</p>
                                    {/* </Link> */}
                                    {/* <DangerButton onClick={() => openModal(carritoproductos.id)} >  Eliminar</DangerButton> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>


    );

}

export default Index;


