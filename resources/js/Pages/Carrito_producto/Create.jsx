import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState,useEffect } from "react";

const Create = ({ auth, producto, carritos }) => {
     console.log(producto.data);
    //console.log(carritos.data[0].id);



    const handleChange = (e) => {
        console.log(e.target.value);
        setData({
            ...data,
            carrito_id: e.target.value
        });
        console.log(data);
    };

    const { data, setData, post, processing,reset, errors } = useForm({

        cantidad: "",
        carrito_id: carritos.data[0].id,
        producto_id: producto.data.id,

    });

    const submit = (e) => {

        e.preventDefault();

        post('/carrito_producto', {

            onSuccess: () => reset(),

        });

        console.log('despues del post' + data.producto_id);


    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                <Link href={route('productos.index')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >   Producto</Link>
                -&gt;Agregar producto al Carritos </h2>}
        >
            <Head title="Carrito Producto" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>

                                <div className="mb-4">
                                    <label htmlFor="carrito_id" className="block text-sm font-medium text-gray-700">
                                        Carrito
                                    </label>
                                    <select
                                        id="carrito_id"
                                        name="carrito.id"
                                        onChange={handleChange} // Asume que tienes una función handleChange para manejar los cambios
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {carritos.data.map((carrito) => (
                                            <option key={carrito.id} value={carrito.id}>
                                                 {carrito.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div className="mb-4">
                                    <label htmlFor="id_carrito" className="block text-sm font-medium text-gray-700">
                                        intificador del carrito
                                    </label>
                                    <input
                                        id="id_carrito"
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.id_carrito}
                                        onChange={(e) => setData("carrito_id", e.target.value)}
                                    />
                                    <InputError error={errors.carrito_id} />
                                </div> */}
                                <div className="mb-4">
                                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
                                        Cantidad
                                    </label>
                                    <input
                                        id="cantidad"
                                        type="number"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.cantidad}
                                        onChange={(e) => setData("cantidad", e.target.value)}
                                    />
                                   <InputError message={errors.cantidad} className="mt-2" />


                                </div>


                                <div className="flex items-center justify-end">
                                    <PrimaryButton type="submit" disabled={processing} >
                                        Crear
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </AuthenticatedLayout >
    );
}




export default Create;
