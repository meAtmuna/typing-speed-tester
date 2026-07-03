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
        labels: wpmHistory.map((_, i) => i + 1),
        datasets: [
            {
                data: wpmHistory,
                borderColor: "#00d4ff",
                backgroundColor: "rgba(0, 212, 255, 0.15)",
                tension: 0.3,
                fill: true, 
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: { color: "#94a3b8"},
                grid: { color: "#1e2a40"},
            },
            y: {
                ticks: { color: "#94a3b8"},
                grid: { color: "#1e2a40"},
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