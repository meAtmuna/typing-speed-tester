function WordSelector({ wordCount, setWordCount}) {
    const wordOptions = [10, 25, 50, 100]

    return (
        <div className="flex justify-center gap-3 mb-8">
            {wordOptions.map((count) => (
              <button 
                className={`px-4 py-2 rounded ${
                  wordCount === count 
                  ? "bg-amber-400 text-black" 
                  : "bg-zinc-800 text-white"
                } `} 
                key={count} 
                onClick={() => setWordCount(count)}
              >
                {count}
              </button>
            ))}
        </div>
    )
}

export default WordSelector