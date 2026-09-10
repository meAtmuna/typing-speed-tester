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
        <div className="min-h-screen bg-black text-primary-text px-8 py-10 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">

            <div className="text-center pb-7 border-b-2 border-white">
              <div className="inline-flex items-center gap-2 text-blue-300 text-sm mb-4 font-medium">
                <Activity size={14} />
                <span>Test Complete</span>
              </div>

              <h1 className="text-5xl font-bold text-blue-300 mb-2">{wpm}</h1>

              <p className="text-muted-text tracking-[0.2em] uppercase">Words Per Minute</p>
            </div>

            <div className="grid grid-cols-3 border-b-2 border-white">
              <div className="p-6 px-4 text-center">
                <p className="text-accuracy text-4xl font-bold">{accuracy}%</p>
                <p className="text-muted-text uppercase text-sm mt-1">Accuracy</p>
              </div>

              <div className="p-6 px-4 text-center relative">
                <div className="absolute left-0 top-5 bottom-5 border-l border-white"></div>
                <div className="absolute right-0 top-5 bottom-5 border-r border-white"></div>
                <p className="text-mistake text-4xl font-bold">{mistakes}</p>
                <p className="text-muted-text uppercase text-sm mt-1">Mistakes</p>
              </div>

              <div className="p-6 px-4 text-center">
                <p className="text-time text-4xl font-bold">{timeLimit}s</p>
                <p className="text-muted-text uppercase text-sm mt-1">Time</p>
              </div>
            </div>

            <div className="mb-5 border-b-2 border-white py-6">
              <p className="text-muted-text uppercase text-sm mb-4">WPM Over Time</p>
              <ResultChart wpmHistory={wpmHistory} />
            </div>
            
            <div className="flex gap-3 pt-2">
              <button
                className="flex-1 py-3 rounded-md border border-border hover:bg-secondary-text/10 text-primary-text transition-colors cursor-pointer flex items-center justify-center gap-2"
                onClick={resetTest}
              >
                <RotateCcw size={18}/>
                <span>Try Again</span>
              </button>

              <button
                className="px-8 py-3 rounded-md border border-border hover:bg-secondary-text/10 text-primary-text transition-colors cursor-pointer flex items-center justify-center gap-2 min-w-[130px]"
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