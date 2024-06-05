import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ auth }) => {

    const { data, setData, post, processing, reset, errors } = useForm({
        nombre: "",
        precio: "",
        descripcion: "",
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
      post('/productos');


    };
    // return (
    //     <AuthenticatedLayout
    //         user={auth.user}
    //         header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Producto</h2>}
    //     >
    //         <Head title="Crear Producto" />
    //         <div className="py-12">
    //             <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
    //                 <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    //                     <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //                         <div className="bg-gray-100 p-6 rounded-md shadow-md">
    //                             <form onSubmit={submit} method="POST" encType="multipart/form-data">
    //                                 <div className="mb-4">
    //                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
    //                                         Nombre
    //                                     </label>
    //                                     <input
    //                                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //                                         id="nombre"
    //                                         name="nombre"
    //                                         type="text"
    //                                         placeholder="Nombre"
    //                                     />
    //                                 </div>
    //                                 <div className="mb-4">
    //                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
    //                                         Precio
    //                                     </label>
    //                                     <input
    //                                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //                                         id="precio"
    //                                         name="precio"
    //                                         type="number"
    //                                         placeholder="Precio"
    //                                     />
    //                                 </div>
    //                                 <div className="mb-4">
    //                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
    //                                         Descripción
    //                                     </label>
    //                                     <textarea
    //                                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //                                         id="descripcion"
    //                                         name="descripcion"
    //                                         placeholder="Descripción"
    //                                     ></textarea>
    //                                 </div>
    //                                 <div className="mb-4">
    //                                     <label className="block text-gray-700 text-sm font-bold mb-2    " htmlFor="imagen">
    //                                         Imagen
    //                                     </label>

    //                                     <input
    //                                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //                                         id="imagen"
    //                                         name="imagen"
    //                                         type="file"
    //                                     />
    //                                 </div>
    //                                 <div className="flex items-center justify-between">
    //                                     <button
    //                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //                                         type="submit"
    //                                     >
    //                                         Crear
    //                                     </button>
    //                                 </div>
    //                             </form>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </AuthenticatedLayout>
    // );


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Productos</h2>}
        >
            <Head title="Productos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.nombre}
                                        onChange={(e) => setData("nombre", e.target.value)}
                                    />
                                    <InputError error={errors.nombre} />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                                        Precio
                                    </label>
                                    <input
                                        id="precio"
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.precio}
                                        onChange={(e) => setData("precio", e.target.value)}
                                    />
                                    <InputError error={errors.precio} />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="decripcion" className="block text-sm font-medium text-gray-700">
                                        Descripción
                                    </label>
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.descripcion}
                                        onChange={(e) =>
                                            setData("descripcion", e.target.value)
                                        }

                                    />
                                    <InputError error={errors.description} />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton

                                        className={processing ? "opacity-25" : ""}
                                        processing={processing}
                                    >
                                        Crear
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}




export default Create;
