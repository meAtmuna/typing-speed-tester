import { Chart as ChartJS, CategoryScale, LinearScale,  PointElement, LineElement, Tooltip, Legend} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip, 
    Legend
)

function ResultChart({wpmHistory}) {
    const data = {
        labels: wpmHistory.map((_, i) => `${i + 1}s`),
        datasets: [
            {
                data: wpmHistory,
                borderColor: "#00d4ff",
                backgroundColor: "rgba(0, 212, 255, 0.15)",
                tension: 0.4,
                fill: true, 
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 3,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: "#131825",
                borderColor: "#00d4ff",
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                cornerRadius: 10,
                callbacks: {
                    title: (items) => `Second: ${items[0].label}`,
                    label: (context) => `WPM: ${context.raw}`
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time (seconds)",
                    color: "#94a3b8"
                },
                ticks: { 
                    color: "#94a3b8"
                },
                grid: { 
                    color: "#1e2a40"
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Words Per Minute",
                    color: "#94a3b8"
                },
                ticks: { 
                    color: "#94a3b8"
                },
                grid: { 
                    color: "#1e2a40"
                },
                beginAtZero: true
            }
        }
    }

    return (
        <div className="w-full h-64">
            <Line data={data} options={options} />
        </div>
    )
}

export default ResultChart