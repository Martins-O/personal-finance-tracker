import { useState, useEffect } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Summary } from './components/Summary';
import { ExportButton } from './components/ExportButton';
import type {Category, Transaction} from "./components/types/types.ts";

function App() {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : [];
    });

    const [categories, setCategories] = useState<Category[]>(() => {
        const saved = localStorage.getItem('categories');
        return saved ? JSON.parse(saved) : [
            { id: '1', name: 'Salary', type: 'income' },
            { id: '2', name: 'Freelance', type: 'income' },
            { id: '3', name: 'Food', type: 'expense' },
            { id: '4', name: 'Transport', type: 'expense' },
            { id: '5', name: 'Entertainment', type: 'expense' },
        ];
    });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction = {
            ...transaction,
            id: Date.now().toString(),
        };
        setTransactions([...transactions, newTransaction]);
    };

    // const addCategory = (category: Omit<Category, 'id'>) => {
    //     const newCategory = {
    //         ...category,
    //         id: Date.now().toString(),
    //     };
    //     setCategories([...categories, newCategory]);
    // };

    // Update the addCategory function to:
    const addCategory = (category: Omit<Category, 'id'>) => {
        const newCategory = {
            ...category,
            id: Date.now().toString(),
        };
        setCategories([...categories, newCategory]);
        return newCategory;
    };


    const deleteTransaction = (id: string) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Personal Finance Tracker</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <TransactionForm
                        onSubmit={addTransaction}
                        categories={categories}
                        addCategory={addCategory}
                    />
                </div>

                <div className="md:col-span-2">
                    <Summary transactions={transactions} />
                    <div className="flex justify-end mb-4">
                        <ExportButton transactions={transactions} />
                    </div>
                    <TransactionList
                        transactions={transactions}
                        categories={categories}
                        onDelete={deleteTransaction}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;