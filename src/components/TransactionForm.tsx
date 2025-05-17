import { useState } from 'react';
import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import type { Category, Transaction } from "./types/types.ts";

interface TransactionFormProps {
    onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
    categories: Category[];
    addCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
}

export function TransactionForm({ onSubmit, categories, addCategory }: TransactionFormProps) {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [categoryId, setCategoryId] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryType, setNewCategoryType] = useState<'income' | 'expense'>(type); // Default to current type

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

        // Reset form but keep the type and date
        setAmount('');
        setNotes('');
        setCategoryId('');
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        try {
            const newCategory = await addCategory({
                name: newCategoryName.trim(),
                type: newCategoryType,
            });

            // Set the new category as selected
            setCategoryId(newCategory.id);
            setType(newCategoryType);
            setNewCategoryName('');
            setShowCategoryForm(false);
        } catch (error) {
            console.error("Failed to add category:", error);
        }
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
                            className={`flex-1 px-4 py-2 rounded-l-lg flex items-center justify-center gap-2 ${
                                type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => {
                                setType('expense');
                                if (showCategoryForm) setNewCategoryType('expense');
                            }}
                        >
                            <FaMinus />
                            Expense
                        </button>
                        <button
                            type="button"
                            className={`flex-1 px-4 py-2 rounded-r-lg flex items-center justify-center gap-2 ${
                                type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => {
                                setType('income');
                                if (showCategoryForm) setNewCategoryType('income');
                            }}
                        >
                            <FaPlus />
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
                        min="0.01"
                        required
                        placeholder="0.00"
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
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-medium">Category</label>
                        <button
                            type="button"
                            className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                            onClick={() => {
                                setShowCategoryForm(!showCategoryForm);
                                setNewCategoryType(type);
                            }}
                        >
                            {showCategoryForm ? (
                                <>
                                    <FaTimes className="inline" /> Cancel
                                </>
                            ) : (
                                <>
                                    <FaPlus className="inline" /> Add Category
                                </>
                            )}
                        </button>
                    </div>

                    {showCategoryForm ? (
                        <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <form onSubmit={handleAddCategory}>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="flex-1 p-2 border rounded"
                                        placeholder="Category name"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    <select
                                        className="p-2 border rounded"
                                        value={newCategoryType}
                                        onChange={(e) => setNewCategoryType(e.target.value as 'income' | 'expense')}
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                    >
                                        Add Category
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
                                        onClick={() => setShowCategoryForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
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
                        placeholder="Add any additional notes..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                    disabled={!amount || !categoryId}
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}