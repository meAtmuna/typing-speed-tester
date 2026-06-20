function Stats({ timeLeft, wpm, mistakes, accuracy }) {
    return (
        <div className="flex justify-center gap-8 mb-8 text-lg">
          <p className="text-yellow-400">
            Time: {timeLeft}s
          </p>
          <p className="text-green-400">
            WPM: {wpm}
          </p>
          <p className="text-red-500">
            Mistakes: {mistakes}
          </p>
          <p className="text-blue-400">
            Accuracy:  {accuracy}%
          </p>
        </div>
    )
}

export default Stats