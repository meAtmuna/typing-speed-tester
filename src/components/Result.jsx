import ResultChart from "./ResultChart"

function ResultModal({wpm, accuracy, mistakes, resetTest, wpmHistory}) {
    return(
        <div className="min-h-screen bg-app-bg text-primary-text flex items-center justify-center px-6">
          <div className="bg-card border border-border p-8 rounded-2xl w-full max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Your Results
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
              <div>
                <p className="text-muted-text">WPM</p>
                <p className="text-cyan text-3xl font-bold">{wpm}</p>
              </div>

              <div>
                <p className="text-muted-text">Accuracy</p>
                <p className="text-emerald-400 text-3xl font-bold">{accuracy}%</p>
              </div>

              <div>
                <p className="text-muted-text">Mistakes</p>
                <p className="text-mistake text-3xl font-bold">{mistakes}</p>
              </div>
            </div>

            <div className="mb-8">
              <ResultChart wpmHistory={wpmHistory} />
            </div>
            
            <div className="text-center">
              <button
                className="px-6 py-3 bg-cyan text-app-bg rounded-xl font-bold"
                onClick={resetTest}
              >
                Restart 
              </button>
            </div>
          </div>
        </div>
    )
}

export default ResultModal