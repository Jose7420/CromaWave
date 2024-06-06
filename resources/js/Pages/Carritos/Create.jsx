import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ auth }) => {

    const { data, setData, post, processing, reset, errors } = useForm({

        nombre: "",
        descripcion: "",
        propietario: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post('/carritos');


    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"><Link href={route('carritos.index')}>Carrito</Link>-&gt;Agregar Carritos</h2>}
        >
            <Head title="Carritos" />

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
                                    <label htmlFor="id_usuario" className="block text-sm font-medium text-gray-700">
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
