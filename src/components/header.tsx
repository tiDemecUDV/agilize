export function Header() {
  return (
    <header className="flex flex-col gap-2 bg-primary/5 py-3 sm:py-4 px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <img src="logo.png" alt="Logo Agilize" className="size-8" />
        <h1 className="text-2xl font-semibold text-gray-800">Agilize</h1>
      </div>

      <h2 className="text-sm text-gray-500">
        Suporte ao Sistema Único de Contabilidade
      </h2>
    </header>
  )
}
