import { useXTerm } from 'react-xtermjs'

function App() {
  const { instance, ref } = useXTerm()
  instance?.writeln('Hello from react-xtermjs!')
  instance?.onData((data) => instance?.write(data))

  return (
    <div className="flex flex-col gap-5 bg-gray-100 p-14 min-h-screen">
      <button
        type="button"
        onClick={() => instance?.reset()}
        className="transition-colors text-white hover:bg-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 tracking-wide rounded-lg text-sm px-5 py-2.5 max-w-fit mx-auto"
      >
        Clear terminal
      </button>
      <div className="p-3 rounded overflow-hidden border border-gray-300 shadow-lg">
        <div ref={ref} />
      </div>
    </div>
  )
}

export default App
