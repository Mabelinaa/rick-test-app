
import Layout from "@/components/layout";
import Link from "next/link";

export default function User() {

  return (
    <div>
      <Layout>

        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8 pt-8 text-center">
          
          <div className="text-base max-w-prose mx-auto lg:max-w-none">
            <h2 className=" mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Sobre el proyecto
            </h2>
          </div>
          
          <div className="relative z-10 text-base max-w-prose mx-auto  ">
            <p className="text-lg text-gray-500">
              Bienvenid@! Este proyecto está desarrollado con NextJS y Tailwind.
              La gestión de estados se realiza con React Hooks y Zustand. El formulario
              es de Formik y la validación de datos se hace con ZOD, así como la solicitud
              POST a la API (Firebase). Para más detalles, por favor, visita el repositorio.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center">
              <div className="rounded-md shadow">
                <Link
                  href="https://github.com/Mabelinaa/rick-test-app"
                  className=" w-full flex items-center justify-center px-5 py-3 border border-transparent text-xs md:text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-700" >
                GitHub Repositorio
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className="bg-gray-50 mt-6">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center lg:text-left" >
              <span className="block"> ¡Espero que te haya gustado! </span>
              <span className="block text-indigo-600">¿Seguimos en contacto?</span>
            </h2>

            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="www.linkedin.com/in/mabel-campomanes-isidoro"
                  className=" inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm md:text-base font-medium rounded-md  text-white  bg-purple-600  hover:bg-purple-700 ">
                  Linkedin
                </a>
              </div>
            </div>
            
          </div>
        </div>
      
      </Layout>
    </div> 

  );
}

