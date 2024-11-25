import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row flex-wrap sm:items-center sm:justify-between gap-2 text-xs text-gray-400 py-2 mt-4">
      <p className="text-center sm:text-left">
        Por favor, leia a{' '}
        <Link
          to="https://politicadeprivacidade.udv.org.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 px-1"
        >
          política de privacidade
        </Link>{' '}
        fornecida pelo desenvolvedor do aplicativo.
      </p>

      <div className="flex items-center gap-3 justify-end pr-3">
        <span className="uppercase">Desenvolvido por</span>
        <img
          src="https://dify.udv.org/logo/logo-site.png"
          alt="Logo Dify"
          className="w-auto h-5"
        />
      </div>
    </footer>
  )
}
