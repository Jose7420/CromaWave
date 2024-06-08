import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from '@inertiajs/react';


const Edit = ({ auth, producto }) => {



    const { data, setData, errors } = useForm({
        id: producto.data.id,
        nombre: producto.data.nombre,
        precio: producto.data.precio,
        descripcion: producto.data.descripcion,
        imagen: producto.data.imagen,


    });


    const submit = (e) => {


        e.preventDefault();
        console.log("dentro de submint datos: ");
        console.table(data);


        router.post(`/productos/${data.id}`, {
            _method: 'put',
            nombre: data.nombre,
            precio: data.precio,
            descripcion: data.descripcion,
            imagen: data.imagen


        });


    };



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"><Link href={route('productos.index')}>Productos</Link>-&gt;Editar Producto</h2>}
        >
            <Head title="Editar Producto" />
            <div className="py-12 ">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <div className="bg-gray-100 p-6 rounded-md shadow-md">
                                <form onSubmit={submit} encType="multipart/form-data">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                            Nombre
                                        </label>
                                        <input
                                            className="shadow appearance-none border
                                            rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            value={data.nombre}
                                            onChange={e => setData('nombre', e.target.value)}

                                        />
                                        <InputError message={errors.nombre} className="mt-2" />

                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                            Precio
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="precio"
                                            name="precio"
                                            type="number"
                                            placeholder="Precio"
                                            value={data.precio}
                                            onChange={e => setData('precio', e.target.value)}
                                        />
                                        <InputError message={errors.precio} className="mt-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                                            Descripción
                                        </label>
                                        <textarea
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="descripcion"
                                            name="descripcion"

                                            value={data.descripcion}
                                            onChange={e => setData('descripcion', e.target.value)}
                                            rows="5"
                                            resize="none"
                                        ></textarea>

                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor=" imagen">
                                                Imagen
                                        </label>
                                        {data.imagen && <img src={data.imagen} alt="imagen del producto" />}
                                        <input
                                            type="file"
                                            name="imagen"
                                            id="imagen"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={(e) => setData('imagen', e.target.files[0])}
                                            accept="image/png, image/jpeg, image/jpg"
                                        />
                                        <InputError message={errors.imagen} className="mt-2" />


                                    </div>
                                    <div className="flex items-center justify-between">
                                        <PrimaryButton
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Guardar
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>


    );
}

export default Edit;
