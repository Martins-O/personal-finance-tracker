import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import type {Transaction} from "./types/types.ts";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface SummaryProps {
    transactions: Transaction[];
}

export function Summary({ transactions }: Readonly<SummaryProps>) {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    const incomeData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                data: [income, expenses],
                backgroundColor: ['#10B981', '#EF4444'],
                hoverBackgroundColor: ['#059669', '#DC2626'],
            },
        ],
    };

    // Group by month for bar chart
    const monthlyData = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!acc[monthYear]) {
            acc[monthYear] = { income: 0, expenses: 0 };
        }

        if (transaction.type === 'income') {
            acc[monthYear].income += transaction.amount;
        } else {
            acc[monthYear].expenses += transaction.amount;
        }

        return acc;
    }, {} as Record<string, { income: number; expenses: number }>);

    const months = Object.keys(monthlyData).sort();
    const barData = {
        labels: months,
        datasets: [
            {
                label: 'Income',
                data: months.map(month => monthlyData[month].income),
                backgroundColor: '#10B981',
            },
            {
                label: 'Expenses',
                data: months.map(month => monthlyData[month].expenses),
                backgroundColor: '#EF4444',
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-green-800 font-medium">Income</h3>
                    <p className="text-2xl font-bold text-green-600">${income.toFixed(2)}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-red-800 font-medium">Expenses</h3>
                    <p className="text-2xl font-bold text-red-600">${expenses.toFixed(2)}</p>
                </div>
                <div className={`p-4 rounded-lg ${
                    balance >= 0 ? 'bg-green-50' : 'bg-red-50'
                }`}>
                    <h3 className={balance >= 0 ? 'text-green-800' : 'text-red-800'}>Balance</h3>
                    <p className={`text-2xl font-bold ${
                        balance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                        ${balance.toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-medium mb-2">Income vs Expenses</h3>
                    <Doughnut data={incomeData} />
                </div>
                <div>
                    <h3 className="font-medium mb-2">Monthly Overview</h3>
                    <Bar
                        data={barData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}