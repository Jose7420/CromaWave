import React from 'react';

import ApplicationLogo from '@/Components/ApplicationLogo';
const Footer = () => {
    // return (
    //     <footer style={{ backgroundColor: '#f8f9fa', padding: '10px 0', position: 'fixed', bottom: 0, width: '100%' }}>
    //         <div style={{ textAlign: 'center' }}>
    //             <p>&copy; {new Date().getFullYear()} Mi Aplicación</p>
    //         </div>
    //     </footer>
    // );
    // return (
    //     <footer className="bg-gray-400 p-4 bottom-0 w-full">
    //         <div className="text-center">
    //             {/* <img src='./img/' alt='logo' className='w-20 h-20 mx-auto' /> */}
    //             <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
    //             <p>&copy; {new Date().getFullYear()} Mi Aplicación</p>
    //         </div>
    //     </footer>
    // );

    // return (
    //     <footer className="bg-gray-400 p-4 bottom-0 w-full flex justify-between items-center h-100">
    //         <div>
    //             <ApplicationLogo className="block h-10 w-auto fill-current text-blue-800" />


    //         </div>
    //         <p>Croma Wave</p>
    //         <ul className="list-none">
    //             <li><a href="/nosotros" className="text-black-600 hover:text-blue-800">Nosotros</a></li>
    //             <li><a href="/aviso-legal" className="text-black-500 hover:text-blue-800">Aviso Legal</a></li>
    //         </ul>

    //     </footer>
    // );

    return (
        <footer className="bg-nature-400 p-4  w-full flex justify-between items-center shadow ">

            <div className="flex items-center">
                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
                <p className='ml-2'>CROMAWAVE</p>
            </div>
            <ul className="list-none mr-6">
                <li><a href="#" className="text-black-600 hover:text-blue-800">Nosotros</a></li>
                <li><a href="#" className="text-balck-600 hover:text-blue-800">Aviso Legal</a></li>
            </ul>
        </footer>
    );

};

export default Footer;
