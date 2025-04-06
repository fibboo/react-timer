import {Timer} from "./componets/Timer.jsx";

function App() {
  return (
      <>
        <div
            className="min-h-screen flex flex-col justify-start items-center px-4">
          <h2 className="text-4xl sm:text-6xl font-bold mb-4 mt-3 text-center drop-shadow-lg">
            Best timer ever!
          </h2>
          <p className="text-lg sm:text-xl mb-4 text-center max-w-xl">
            Track your seconds - plan your milliseconds.
          </p>
          <Timer/>
        </div>
      </>
  )
}

export default App
