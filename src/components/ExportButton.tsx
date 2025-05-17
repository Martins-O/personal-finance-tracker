import {FaFileExport} from 'react-icons/fa';
import type {Transaction} from "./types/types.ts";

interface ExportButtonProps {
    transactions: Transaction[];
}

export function ExportButton({ transactions }: Readonly<ExportButtonProps>) {
    const exportToCSV = () => {
        if (transactions.length === 0) return;

        const headers = ['Date', 'Type', 'Amount', 'Category', 'Notes'];
        const csvRows = [
            headers.join(','),
            ...transactions.map(t => [
                t.date,
                t.type,
                t.amount,
                t.categoryId,
                t.notes ?? ''
            ].map(field => `"${field.toString().replace(/"/g, '""')}"`).join(','))
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={transactions.length === 0}
        >
            <FaFileExport />
            Export to CSV
        </button>
    );
}