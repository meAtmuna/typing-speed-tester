function ResultModal({wpm, accuracy, mistakes, resetTest}) {
    return(
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
          <div className="bg-zinc-900 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Your Stats
            </h2>
        
            <p className="text-green-400">WPM: {wpm}</p>
            <p className="text-blue-500">Accuracy: {accuracy}%</p>
            <p className="text-red-500">Mistakes: {mistakes}</p>
        
            <button
              className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded"
              onClick={resetTest}
            >
              Restart 
            </button>
          </div>
        </div>
    )
}

export default ResultModal