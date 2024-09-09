"use client";
import { useEffect, useState } from "react";
import type { Transaction } from "@prisma/client";
import Link from "next/link";

const Page = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedTransactions, setSelectedTransactions] = useState<Set<number>>(
		new Set(),
	);

	useEffect(() => {
		setLoading(true);
		fetch("/api/transactions")
			.then((res) => res.json())
			.then((data) => setTransactions(data.transactions))
			.finally(() => setLoading(false));
	}, []);

	const handleCheckboxChange = (id: number) => {
		setSelectedTransactions((prevSelected) => {
			const newSelected = new Set(prevSelected);
			if (newSelected.has(id)) {
				newSelected.delete(id);
			} else {
				newSelected.add(id);
			}
			return newSelected;
		});
	};

	const handleDeleteSelected = () => {
		const idsToDelete = Array.from(selectedTransactions);
		fetch("/api/trans-config", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ type: "delete", ID: idsToDelete }),
		})
			.then((res) => res.json())
			.catch((e) => {
				console.error(e);
				alert("Error deleting transactions");
			});
		return (
			<div>
				<ul>deleted.</ul>
				<Link href="/transactions">Go back to transactions</Link>
			</div>
		);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Transactions</h1>
			<table className="table-auto border-black border-2 border-separate border-spacing-1">
				<thead>
					<tr>
						<th>Category</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Description</th>
						<th>Delete?</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr key={transaction.id} className="border">
							<td className="border">{transaction.category}</td>
							<td className="border">{transaction.amount}</td>
							<td className="border">
								{new Date(transaction.date).toLocaleDateString("en-CA")}
							</td>
							<td className="border text-wrap">{transaction.description}</td>
							<td className="border">
								<input
									type="checkbox"
									checked={selectedTransactions.has(transaction.id)}
									onChange={() => handleCheckboxChange(transaction.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex-auto space-x-4 border-spacing-3">
				<button
					type="button"
					onClick={handleDeleteSelected}
					className="p-2 mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					削除する
				</button>
			</div>
		</div>
	);
};

export default Page;
