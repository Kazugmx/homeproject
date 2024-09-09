"use client";
import Link from "next/link";
import { useState } from "react";
import type { Transaction } from "@prisma/client";

interface TransactionForm {
	description: string;
	amount: number;
	category: string;
	date: string;
}

const Home = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [transactionForm, setTransactionForm] = useState<TransactionForm>({
		description: "",
		amount: 0,
		category: "",
		date: "",
	});

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = event.target;
		setTransactionForm({ ...transactionForm, [name]: value });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await fetch("/api/transactions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(transactionForm),
			});
			if (response.ok) {
				const newTransaction = await response.json();
				setTransactions([...transactions, newTransaction]);
				setTransactionForm({
					description: "",
					amount: 0,
					category: "",
					date: "",
				});
			} else {
				console.error("Transaction creation failed");
			}
		} catch (error) {
			console.error("Error creating transaction:", error);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div>
					<label htmlFor="description">説明:</label>
					<input
						type="text"
						id="description"
						name="description"
						value={transactionForm.description}
						onChange={handleInputChange}
						className="border rounded-md p-2"
					/>
				</div>
				<div>
					<label htmlFor="amount">金額:</label>
					<input
						type="number"
						id="amount"
						name="amount"
						value={transactionForm.amount}
						onChange={handleInputChange}
						className="border rounded-md p-2"
					/>
				</div>
				<div>
					<label htmlFor="category">カテゴリ:</label>
					<input
						type="text"
						id="category"
						name="category"
						value={transactionForm.category}
						onChange={handleInputChange}
						className="border rounded-md p-2"
					/>
				</div>
				<div>
					<label htmlFor="date">日付:</label>
					<input
						type="date"
						id="date"
						name="date"
						value={transactionForm.date}
						onChange={handleInputChange}
						className="border rounded-md p-2"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					追加
				</button>
				<Link
					href="/balance"
					className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded text-center"
				>
					残高を表示する
				</Link>
			</form>
		</main>
	);
};
export default Home;
