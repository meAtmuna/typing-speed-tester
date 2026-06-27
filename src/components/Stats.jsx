function Stats({ timeLeft, wpm, mistakes, accuracy }) {
  const stats = [
    { label: "TIME" , value: `${timeLeft}s` , color: "text-amber-400"},
    { label: "WPM" , value: wpm , color: "text-emerald-400"},
    { label: "ACCURACY" , value: `${accuracy}%` , color: "text-blue-400"},
    { label: "MISTAKES" , value: mistakes , color: "text-red-400"},
  ]
    return (
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl py-4 mask-l-from-44 mask-r-from-44 text-center"
            >
              <p className="text-xs tracking-widest text-muted-text mb-1">
                {stat.label}
              </p>

              <p className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
    )
}

export default Stats