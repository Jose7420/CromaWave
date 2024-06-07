
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


const Index = ({ auth, users }) => {
    console.log(users.current_page);
    console.log(users);

    const [currentPage, setCurrentPage] = useState(users.current_page);
    const [modal, setModal] = useState(false);
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { reset, data, setData, delete: destroy, processing, errors } = useForm({
        id: '',
        nombre: '',
        email: ''
    });

    const openModal = (id, nombre,email) => {
        console.log("dentro del openModal " + id);
        setModal(true);
        setData({ 'id': id, 'nombre': nombre, 'email':email});


    };

    const closeModal = () => {
        setModal(false);
        reset();
    };


    const handlePageChange = (newPage) => {
        router.visit(`/user?page=${newPage}`);
        setCurrentPage(newPage);
    };


    const eliminarProducto = (e) => {
        console.log(data.id);

        destroy(route('user.destroy', data.id), {
            // preserveScroll: true,
            onSuccess: () => closeModal(),
            // onFinish: () => reset(),
        });
    };



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Usuarios</h2>}
        >
            <Head title="Productos" />
            <div className="py-12">
                <div className="mb-9 flex justify-center">
                    <PrimaryButton disabled={processing}>
                        <Link href={route('user.create')}>Agregar Usuario</Link>
                    </PrimaryButton>

                </div>
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {users.data.map((usuario) => (
                                <div key={usuario.id} className="bg-gray-100 p-6 rounded-md shadow-md">

                                    <div className=" object-none h-20 w-80">
                                        <h3 className="text-lg font-semibold">Nombre: {usuario.name}</h3>
                                        <p className="text-gray-600">Email: {usuario.email}</p>

                                    </div>
                                    <div className="flex space-x-6  ">

                                        {/* <EditButton className="">  <Link
                                            href={route('user.edit', usuario.id)}
                                        > <i className="fa-solid fa-edit text-red-600"></i>Editar</Link>
                                        </EditButton> */}


                                        <DangerButton onClick={() => openModal(usuario.id, usuario.nombre,usuario.email)} disabled={processing} className="ml-9">
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
                            <button className=" btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === users.last_page}>
                                <i className="fas fa-arrow-circle-down"></i> Siguiente
                            </button>
                        </div>
                    </div>

                </div>

            </div>


            {/* Modal  */}
            <Modal show={modal} onClose={closeModal} maxWidth="sm">
                <form onSubmit={eliminarProducto} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estás seguro de que quieres eliminar el producto? {data.nombre}
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


