export interface Transaction {
    id: string;
    amount: number;
    date: string;
    categoryId: string;
    notes?: string;
    type: 'income' | 'expense';
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
}