import { useState } from 'react';
import { format } from 'date-fns';
import { FaTrash, FaFilter } from 'react-icons/fa';
import type { Category, Transaction } from "./types/types.ts";

interface TransactionListProps {
    transactions: Transaction[];
    categories: Category[];
    onDelete: (id: string) => void;
}

export function TransactionList({ transactions, categories, onDelete }: TransactionListProps) {
    const [filter, setFilter] = useState({
        type: 'all',
        category: 'all',
        startDate: '',
        endDate: '',
    });
    const [showFilter, setShowFilter] = useState(false);

    const filteredTransactions = transactions.filter((transaction) => {
        if (filter.type !== 'all' && transaction.type !== filter.type) return false;
        if (filter.category !== 'all' && transaction.categoryId !== filter.category) return false;
        if (filter.startDate && transaction.date < filter.startDate) return false;
        if (filter.endDate && transaction.date > filter.endDate) return false;
        return true;
    });

    const getCategoryName = (id: string) => {
        return categories.find(c => c.id === id)?.name || 'Unknown';
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Transactions</h2>
                <div className="relative">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        <FaFilter />
                        Filter
                    </button>
                    {showFilter && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-10">
                            <div className="mb-3">
                                <label className="block mb-1 text-sm">Type</label>
                                <select
                                    name="type"
                                    className="w-full p-2 border rounded"
                                    value={filter.type}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">All</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 text-sm">Category</label>
                                <select
                                    name="category"
                                    className="w-full p-2 border rounded"
                                    value={filter.category}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">All</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 text-sm">Start Date</label>
                                <input
                                    name="startDate"
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={filter.startDate}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 text-sm">End Date</label>
                                <input
                                    name="endDate"
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={filter.endDate}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <button
                                className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => setShowFilter(false)}
                            >
                                Apply Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {filteredTransactions.length === 0 ? (
                <p className="text-gray-500">No transactions found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getCategoryName(transaction.categoryId)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {transaction.notes || '-'}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap font-medium ${
                                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => onDelete(transaction.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}