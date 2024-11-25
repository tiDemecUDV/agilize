import { Outlet } from 'react-router-dom'

export function UnauthenticatedLayout() {
  return (
    <div>
      <div className="sm:hidden w-full h-14 flex items-center justify-between bg-primary text-white px-4">
        <p className="text-sm font-bold">Agilize</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="size-8 flex items-center justify-center bg-primary hover:bg-black/5 rounded-lg text-white transition duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 fill-white"
          >
            <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z" />
          </svg>
        </button>
      </div>

      <div className="w-full h-[calc(100vh-3.5rem)] sm:h-screen flex items-center justify-center px-4">
        <Outlet />
      </div>
    </div>
  )
}
