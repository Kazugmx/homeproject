"use client";
import { use, useEffect, useState } from "react";
import type { Transaction } from "@prisma/client";
import Link from "next/link";

const Home = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		fetch("/api/transactions")
			.then((res) => res.json())
			.then((data) => setTransactions(data.transactions))
			.finally(() => setLoading(false));
	}, []);
	if (loading) {
		return (
			<div className="flex max-h-screen flex-col items-center justify-between p-24 ">
				Loading...
			</div>
		);
	}
	return (
		<div className="flex max-h-screen flex-col items-center justify-between p-24 ">
			<h1>Transactions</h1>
			<table className="table-auto border-black border-2 border-separate border-spacing-1">
				<thead>
					<tr>
						<th>Category</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Description</th>
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
						</tr>
					))}
				</tbody>
			</table>
			<Link
				href="/transaction"
				className="mt-5 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded text-center"
			>
				記録を追加する
			</Link>
		</div>
	);
};

export default Home;
