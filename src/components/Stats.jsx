function Stats({ timeLeft, wpm, mistakes, accuracy, hideTimer, testStarted }) {
  const stats = [
    { label: "TIME" , value: hideTimer && testStarted ? "•••" : `${timeLeft}s` , color: "text-time"},
    { label: "WPM" , value: wpm , color: "text-wpm"},
    { label: "ACCURACY" , value: `${accuracy}%` , color: "text-accuracy"},
    { label: "MISTAKES" , value: mistakes , color: "text-mistake"},
  ]
    return (
        <div className="grid grid-cols-4 divide-x divide-white border-b border-white py-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <p className="text-xs tracking-widest text-muted-text mb-1">
                {stat.label}
              </p>

              <p className={`text-2xl font-semibold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
    )
}

export default Stats