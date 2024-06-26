import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";




const Create = ({ auth }) => {

    const { data, setData, post, reset, errors } = useForm({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: ""

    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(('/productos'), {
            onSuccess: () => reset(),
        });
    };

    // const handleImageUpload = (e) => {
    //     e.preventDefault();
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append('imagen', file);
    //     formData.append('nombre', data.nombre);
    //     formData.append('descripcion', data.descripcion);
    //     formData.append('precio', data.precio);

    //     Inertia.post('/productos', formData, {
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"><Link href={route('productos.index')}>Productos</Link>-&gt;Agregar Producto</h2>}
        >
            <Head title="Productos" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
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
                                        required
                                    />
                                    <InputError message={errors.nombre} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                                        Precio
                                    </label>
                                    <input
                                        id="precio"
                                        type="number"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.precio}
                                        onChange={(e) => setData("precio", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.precio} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="decripcion" className="block text-sm font-medium text-gray-700">
                                        Descripción
                                    </label>
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.descripcion}
                                        required
                                        onChange={(e) =>
                                            setData("descripcion", e.target.value)
                                        }

                                    />
                                    <InputError error={errors.description} />
                                </div>

                                <input
                                    type="file"
                                    id="imagen"
                                    name="imagen"
                                    onChange={(e) => setData("imagen", e.target.files[0])}
                                    accept="image/png, image/jpeg, image/jpg" />
                                <div className="flex items-center justify-end">
                                    <PrimaryButton type="submit">
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
