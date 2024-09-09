"use client";
import { useEffect, useState } from "react";
import type { Transaction } from "@prisma/client";

const Home = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		fetch("/api/transactions")
			.then((res) => res.json())
			.then((data) => setTransactions(data.transactions));
	}, []);

	return (
		<div className="flex max-h-screen flex-col items-center justify-between p-24">
			<h1>Transactions</h1>
			<table className="table-auto border-black border-2 border-separate border-spacing-1">
				<thead>
					<tr>
						<th>Description</th>
						<th>Category</th>
						<th>Amount</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr key={transaction.id} className="border">
							<td className="border">{transaction.description}</td>
							<td className="border">{transaction.category}</td>
							<td className="border">{transaction.amount}</td>
							<td className="border">
								{new Date(transaction.date).toLocaleDateString("en-CA")}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Home;
