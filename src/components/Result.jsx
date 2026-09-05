import { useState } from "react";
import ResultChart from "./ResultChart"
import { Activity, Share2, Check, RotateCcw} from 'lucide-react'

function ResultModal({wpm, accuracy, mistakes, resetTest, wpmHistory, timeLimit}) {
    const [shareStatus, setShareStatus] = useState("")

    async function shareResult() {
      const text = `My TypeFast Result

  WPM: ${wpm}
  Accuracy: ${accuracy}%
  Mistakes: ${mistakes}
  Time: ${timeLimit}s

  Practice on TypeFast!`;

    try{
      if (navigator.share) {
        await navigator.share({
            title: "My TypeFast Result",
            text,
          });

          setShareStatus("Shared!")
        } 
        else if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          setShareStatus("Copied!");
        }

        setTimeout(() => {
          setShareStatus("")
        }, 2000);

      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    }
    return(
        <div className="h-screen bg-card flex items-center justify-center px-6 py-4 overflow-hidden">
          <div className="bg-app-bg p-7 rounded-3xl w-full max-w-4xl">

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-0.5 px-4 py-1 rounded-full bg-blue-300 text-white text-sm mb-4">
                <Activity size={14} />
                <span>Test Complete</span>
              </div>

              <h1 className="text-6xl font-bold text-blue-300 mb-2">{wpm}</h1>

              <p className="text-muted-text tracking-[0.2em] uppercase">Words Per Minute</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-5 text-center">
                <p className="text-accuracy text-4xl font-bold">{accuracy}%</p>
                <p className="text-muted-text uppercase text-sm mt-1">Accuracy</p>
              </div>

              <div className="p-5 text-center">
                <p className="text-mistake text-4xl font-bold">{mistakes}</p>
                <p className="text-muted-text uppercase text-sm mt-1">Mistakes</p>
              </div>

              <div className="p-5 text-center">
                <p className="text-time text-4xl font-bold">{timeLimit}s</p>
                <p className="text-muted-text uppercase text-sm mt-1">Time</p>
              </div>
            </div>

            <div className="mb-5 bg-typing rounded-2xl p-4">
              <p className="text-muted-text uppercase text-sm mb-4">WPM Over Time</p>
              <ResultChart wpmHistory={wpmHistory} />
            </div>
            
            <div className="flex gap-4">
              <button
                className="flex-1 py-3 rounded-xl border border-border hover:border-white text-primary-text transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
                onClick={resetTest}
              >
                <RotateCcw size={18}/>
                <span>Try Again</span>
              </button>

              <button
                className="px-8 py-3 rounded-xl border border-border hover:border-white text-primary-text transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[130px]"
                onClick={shareResult}
              >
                {shareStatus ? (
                  <>
                    <Check size={18} className="text-white" />
                    {shareStatus}
                  </>
                ) : (
                  <>
                    <Share2 size={18} />
                    Share
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
    )
}

export default ResultModal