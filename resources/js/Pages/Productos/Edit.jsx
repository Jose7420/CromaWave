import { Head, Link,useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Input } from "postcss";
import GuestLayout from '@/Layouts/GuestLayout';


const Edit = ({ auth, producto }) => {


    // const [nombre, setNombre] = useState(producto.data.nombre);
    // const [precio, setPrecio] = useState(producto.data.precio);
    // const [descripcion, setDescripcion] = useState(producto.data.descripcion);

    const { data, setData, patch, reset, errors } = useForm({
        id: producto.data.id,
        nombre: producto.data.nombre,
        precio: producto.data.precio,
        descripcion: producto.data.descripcion,
        imagen: producto.data.imagen,


    });

    // const handleImageUpload = (e) => {
    //     setData({
    //         'imagen': e.target.files[0],
    //         'nombre': data.nombre,
    //         'descripcion': data.descripcion,
    //         'precio': data.precio
    //     });

    //     console.log("los datos cambiados de data");
    //     console.table(data);
    // }




    const submit = (e) => {
        e.preventDefault();
        console.log("datos: ");
        console.table(data);

        patch(route('productos.update', data.id),
            {
                onSuccess: () => {
                    Inertia.reload({ only: ['productos'] });
                },
            }
        );


    };

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append('imagen', file);
    //     formData.append('nombre', data.nombre);
    //     formData.append('descripcion', data.descripcion);
    //     formData.append('precio', data.precio);

    //     patch(`/productos/update`,producto.data.id, formData, {
    //         onBefore: () => {
    //             // Optional: Show a loading spinner or similar here
    //         },
    //         onSuccess: () => {
    //             // Optional: Hide the loading spinner on success
    //         },
    //         onError: (errors) => {
    //             // Optional: Handle the error case
    //         }
    //     });
    // }


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
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            value={data.nombre}
                                            onChange={e => setData('nombre', e.target.value)}

                                        />
                                        <InputError error={errors.nombre} />

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
                                        <InputError error={errors.precio} />
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
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor=" imagen">    Imagen
                                        </label>
                                        <img src={data.imagen} alt="imagen del producto" />
                                        {/* <input
                                            type="file"
                                            name="imagen"
                                            id="imagen"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={(e) => setData('imagen', e.target.files[0])}

                                        /> */}
                                       <input type="file" name="imagen" id="imagen" onChange={(e) => setData('imagen', e.target.files[0])} />


                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Guardar
                                        </button>
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
