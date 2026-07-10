import ResultChart from "./ResultChart"
import { Activity } from 'lucide-react'

function ResultModal({wpm, accuracy, mistakes, resetTest, wpmHistory, timeLeft}) {
    async function shareResult() {
      const text = `My TypeFast Result
        WPM: ${wpm}
        Accuracy: ${accuracy}%
        Mistakes: ${mistakes}
      Practice on TypeFast!
      `;

      try{
        if (navigator.share) {
          await navigator.share({
            title: "My TypeFast Result",
            text,
          });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          alert("Result copied to clipboard");
        }
      } catch (err) {
        console.log(err);
        alert("Unable to share result.")
      }
    }
    return(
        <div className="h-screen bg-app-bg flex items-center justify-center px-6 py-4 overflow-hidden">
          <div className="bg-card border border-border p-7 rounded-3xl w-full max-w-4xl">

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-0.5 px-4 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/20 text-sm mb-4">
                <Activity size={14} />
                <span>Test Complete</span>
              </div>

              <h1 className="text-6xl font-bold text-cyan mb-2">{wpm}</h1>

              <p className="text-muted-text tracking-[0.2em] uppercase">Words Per Minute</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-typing border border-border rounded-2xl p-5 text-center">
                <p className="text-accuracy text-4xl font-bold">{accuracy}%</p>
                <p className="text-muted-text uppercase text-sm mt-1">Accuracy</p>
              </div>

              <div className="bg-typing border border-border rounded-2xl p-5 text-center">
                <p className="text-mistake text-4xl font-bold">{mistakes}</p>
                <p className="text-muted-text uppercase text-sm mt-1">Mistakes</p>
              </div>

              <div className="bg-typing border border-border rounded-2xl p-5 text-center">
                <p className="text-time text-4xl font-bold">{60 - timeLeft}s</p>
                <p className="text-muted-text uppercase text-sm mt-1">Time</p>
              </div>
            </div>

            <div className="mb-5 bg-typing border border-border rounded-2xl p-4">
              <p className="text-muted-text uppercase text-sm mb-4">WPM Over Time</p>
              <ResultChart wpmHistory={wpmHistory} />
            </div>
            
            <div className="flex gap-4">
              <button
                className="flex-1 py-3 rounded-xl border border-border hover:border-cyan text-primary-text transition-all hover:bg-cyan/10 cursor-pointer"
                onClick={resetTest}
              >
                Try Again
              </button>

              <button
                className="px-8 py-3 rounded-xl border border-border hover:border-cyan text-primary-text transition-all hover:bg-cyan/10 cursor-pointer"
                onClick={shareResult}
              >
                Share
              </button>
            </div>
          </div>
        </div>
    )
}

export default ResultModal