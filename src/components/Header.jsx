import { useState, useEffect } from 'react';

import animation from '../css/Animation.module.css'


const Header = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // const [size, setSize] = (true)

    useEffect(() => {
        const text = document.querySelector('#texto')

        if(!text) return
        const textLoad = () => {
            if(windowWidth < 1194) return
            setTimeout(() => {
                text.textContent = 'Pollo';
            }, 0);
            setTimeout(() => {
                text.textContent = 'Carne';
            }, 3000);
            setTimeout(() => {
                text.textContent = 'Verduras';
            }, 6000);
            setTimeout(() => {
                text.textContent = 'Fideos';
            }, 9000);
            setTimeout(() => {
                text.textContent = 'De Todo!!!';
            }, 12000);
        }

        textLoad()
        setInterval(textLoad, 15000);
    }, [windowWidth])

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Limpieza del evento al desmontar el componente
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
    <>
    
        {windowWidth > 1194 ? (
            <div className='p-10 flex flex-col gap-10 lg:flex-row items-center justify-between'>
                <div className='font-bold text-4xl overflow-hidden'>
                    <span className={`${animation.text} ${animation[`first-text`]}`}>Hay que Comprar </span>
                    <span className={`${animation.text} ${animation[`second-text`]} text-green-600`} id='texto'></span>
                </div>

                <h1 className="text-gray-200 font-bold text-6xl">Control de gastos</h1>
            </div>
        ) : (
            <div className='p-10 flex flex-col gap-10 lg:flex-row items-center justify-between'>
                <h1 className="text-gray-200 font-bold text-6xl">Control de gastos</h1>
                <div className='font-bold text-4xl'>
                    <span className='text-gray-200'>Hay que Comprar </span>
                    <span className='text-green-600'>Mucha Comida</span>
                </div>
            </div>
        )}
        
        <nav className='bg-green-900 p-6 flex justify-center gap-12 overflow-hidden border-y border-green-500'>
            <button type='button' 
                className="animate__animated animate__fadeInLeftBig
            text-gray-200 hover:text-green-500 font-bold text-md sm:text-xl bg-gray-900 border-2 border-gray-400 p-3 rounded-md transition-colors hover:border-green-500"
            >
                Agregar Gasto
            </button>

            <button type='button' 
                className="animate__animated animate__fadeInRightBig
            text-gray-200 hover:text-green-500 font-bold text-md sm:text-xl bg-gray-900 border-2 border-gray-400 p-3 rounded-md transition-colors hover:border-green-500"
            >
                Reiniciar Gastos
            </button>
        </nav>
    </>
    )
}

export default Header


