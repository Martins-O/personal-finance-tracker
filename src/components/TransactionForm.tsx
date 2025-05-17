import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import type {Category, Transaction} from "./types/types.ts";

interface TransactionFormProps {
    onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
    categories: Category[];
    addCategory: (category: Omit<Category, 'id'>) => void;
}

export function TransactionForm({ onSubmit, categories, addCategory }: TransactionFormProps) {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [categoryId, setCategoryId] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryType, setNewCategoryType] = useState<'income' | 'expense'>('expense');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !categoryId) return;

        onSubmit({
            amount: parseFloat(amount),
            date,
            categoryId,
            notes,
            type,
        });

        // Reset form
        setAmount('');
        setNotes('');
        setCategoryId('');
    };

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName) return;

        addCategory({
            name: newCategoryName,
            type: newCategoryType,
        });

        setNewCategoryName('');
        setShowCategoryForm(false);
    };

    const filteredCategories = categories.filter(c => c.type === type);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Type</label>
                    <div className="flex">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-l-lg ${type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setType('expense')}
                        >
                            <FaMinus className="inline mr-2" />
                            Expense
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-r-lg ${type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setType('income')}
                        >
                            <FaPlus className="inline mr-2" />
                            Income
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Amount</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Date</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <label>Category</label>
                        <button
                            type="button"
                            className="text-sm text-blue-500"
                            onClick={() => setShowCategoryForm(!showCategoryForm)}
                        >
                            {showCategoryForm ? 'Cancel' : '+ Add Category'}
                        </button>
                    </div>

                    {showCategoryForm ? (
                        <form onSubmit={handleAddCategory} className="mb-4">
                            <div className="flex mb-2">
                                <input
                                    type="text"
                                    className="flex-1 p-2 border rounded-l"
                                    placeholder="Category name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    required
                                />
                                <select
                                    className="p-2 border rounded-r"
                                    value={newCategoryType}
                                    onChange={(e) => setNewCategoryType(e.target.value as 'income' | 'expense')}
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded"
                            >
                                Add Category
                            </button>
                        </form>
                    ) : (
                        <select
                            className="w-full p-2 border rounded"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {filteredCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Notes (optional)</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}