import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ auth, producto }) => {

    const { data, setData, post, reset, errors } = useForm({

        cantidad: "",
        carrito_id: "",
        producto_id: producto.data.id,

    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        post('/carrito_producto', {

            onSuccess: () => reset(),
        });

        console.log('despues del post' + data.producto_id);


    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Carritos productos</h2>}
        >
            <Head title="Carrito Producto" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>


                                <div className="mb-4">
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
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
                                        Cantidad
                                    </label>
                                    <input
                                        id="cantidad"
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.cantidad}
                                        onChange={(e) => setData("cantidad", e.target.value)}
                                    />
                                    <InputError error={errors.cantidad} />


                                </div>




                                <div className="flex items-center justify-end">
                                    <PrimaryButton type="submit" >
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
