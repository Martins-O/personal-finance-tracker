# Personal Finance Tracker

A comprehensive application for tracking personal finances, enabling users to monitor and analyze their income and expenses with categorization and filtering options.

![App Screenshot](./screenshot.png)

## Features

- **Transaction Management**
    - Add income and expense transactions
    - View all transactions in a clean table layout
    - Delete transactions as needed

- **Detailed Categorization**
    - Default categories provided (Salary, Food, Transport, etc.)
    - Create custom categories for income and expenses
    - Categories persist between sessions

- **Advanced Filtering**
    - Filter by transaction type (income/expense/all)
    - Filter by specific category
    - Filter by date range

- **Visual Analytics**
    - Income vs. expense doughnut chart
    - Monthly overview bar chart
    - Summary cards showing totals

- **Data Export**
    - Export all transactions to CSV format

## Technologies Used

- React.js with TypeScript
- Tailwind CSS for styling
- date-fns for date handling
- Chart.js for data visualization
- React Icons for icon set

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-finance-tracker.git

2. Install dependencies:
    ```bash
   npm install

3. Run the development server:
    ```bash
   npm run dev

4. Open your browser and visit:
    ```
   http://localhost:5173

## Usage Guide

- **Adding Transactions**
  - Select transaction type (Income/Expense)
  - Enter the amount 
  - Select a date (defaults to today)
  - Choose or create a category
  - (Optional) Add notes 
  - Click "Add Transaction"
  


- **Managing Categories**
  - Click "+ Add Category" in the transaction form 
  - Enter a category name 
  - Select category type (Income/Expense)
  - Click "Add Category"


- **Filtering Transactions**
  - Click the "Filter" button above the transactions list 
  - Set your filters:
    - Type (Income/Expense/All)
    - Specific category 
    - Date range 
  - Click "Apply Filters"

- **Exporting Data**
  - Click "Export to CSV" button 
  - A CSV file will download automatically

## Data Persistence

All your transactions and categories are automatically saved in your browser's localStorage. This means:

- Your data persists between sessions
- No need to manually save
- Data is specific to your browser/device