# Personal Finance Tracker

A web-based application for tracking personal income and expenses, built with Next.js, React, and Supabase. Users can add, delete, and view transactions, with real-time summaries of total income, expenses, and balance. The app features optimistic updates for a smooth user experience, form validation, and a responsive design.

## Features

- **Add Transactions**: Record income or expenses with title, amount, type, and category.
- **Real-Time Summaries**: View total income, expenses, and balance in summary cards.
- **Delete Transactions**: Remove individual transactions with a single click.
- **Clear Data**: Reset all transactions with a confirmation prompt.
- **Form Validation**: Client-side validation using `react-hook-form` and `yup`.
- **Optimistic Updates**: Transactions appear instantly in the UI, with rollback on failure.
- **Supabase Backend**: Persistent storage in a PostgreSQL database.
- **Responsive UI**: Styled with Tailwind CSS for mobile and desktop compatibility.

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: `react-hook-form`, `yup`
- **Backend**: Supabase (PostgreSQL)
- **Utilities**: `uuid` for unique IDs,

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project
- Git

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd personal-finance-tracker
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the project root and add your Supabase credentials:

   ```env
   SUPABASE_URL=your-supabase-project-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   - Find these in your Supabase project’s Settings > API.

4. **Set Up Supabase Table**

   - In Supabase, create a `transactions` table via the SQL Editor:
     ```sql
     CREATE TABLE transactions (
       id TEXT PRIMARY KEY,
       title TEXT NOT NULL,
       amount NUMERIC NOT NULL,
       type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
       category TEXT NOT NULL,
       date TIMESTAMP NOT NULL
     );
     ```

5. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open `http://localhost:3000` in your browser to view the app.

6. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

## Usage

- **Add a Transaction**: Enter details (title, amount, type, category) in the form and submit. Income must be added before expenses.
- **View Summaries**: Check the summary cards for total income, expenses, and balance.
- **Delete Transactions**: Click the delete button next to a transaction to remove it.
- **Clear All Data**: Use the "Clear Data" button to delete all transactions (requires confirmation).
- **View Summary Page**: Navigate to `/summary` for detailed analytics.


## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## Deployment

- **Vercel**:
  1. Push your code to a GitHub repository.
  2. Connect to Vercel and import the repository.
  3. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` as environment variables in Vercel’s dashboard.
  4. Deploy the app.
- Ensure your Supabase project’s region is close to your deployment region for low latency.

## License

MIT License
