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
                label: "WPM",
                data: wpmHistory,
                borderColor: "#00d4ff",
                backgroundColor: "rgba(0, 212, 255, 0.15)",
                tension: 0.3,
                fill: true, 
                pointRadius: 4,
                borderWidth: 2
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "#f1f5f9"
                }
            }
        },
        scales: {
            x: {
                ticks: { color: "#94a3b8"},
                grid: { color: "#1e293b"},
            },
            y: {
                ticks: { color: "#94a3b8"},
                grid: { color: "#1e293b"},
            }
        }
    }

    return <Line data={data} options={options} />
}

export default ResultChart