"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Transaction } from "@prisma/client";
import Link from "next/link";

interface Summary{
	amount: number;
}

const Home = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [summary, setSum] = useState<Summary>({amount: 0});
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		setLoading(true);
		fetch("/api/transactions")
			.then((res) => res.json())
			.then((data) => setTransactions(data.transactions));
		fetch("/api/transactions?type=sum")
			.then((res) => res.json())
			.then((data) => setSum(data.sum._sum))
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
					<tr>
						<td>合計</td>
						<td>{summary.amount}</td>
					</tr>
				</tbody>
			</table>
			<div className="flex-auto space-x-4 border-spacing-3">
				<Link
					href="/transaction"
					className="p-2 mt-5 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded text-center"
				>
					記録を追加する
				</Link>

				<button
					type="button"
					onClick={() => {
						window.location.reload()
					}}
					className="p-2 mt-5 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded text-center"
				>
					再読み込みする
				</button>
			</div>
		</div>
	);
};

export default Home;
