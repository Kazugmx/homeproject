import { NextResponse, type NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	return NextResponse.json({}, { status: 405 });
}
// POSTメソッド
export async function POST(req: NextRequest) {
	let payload: { type: string; ID: number | number[] };
	try {
		payload = await req.json();
	} catch (_error) {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const { type, ID } = payload;
	if (type === "delete" && !Array.isArray(ID)) {
		try {
			const deletedTransaction = await prisma.transaction.delete({
				where: {
					id: ID,
				},
			});
			return NextResponse.json(deletedTransaction, { status: 202 });
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === "P2025"
			) {
				return NextResponse.json(
					{ error: "Transaction not found" },
					{ status: 404 },
				);
			}
		}
	}
	if (type === "delete" && Array.isArray(ID)) {
		for (const targetID of ID) {
			try {
				await prisma.transaction.delete({
					where: {
						id: targetID,
					},
				});
			} catch (error) {
				if (
					error instanceof Prisma.PrismaClientKnownRequestError &&
					error.code === "P2025"
				) {
					return NextResponse.json(
						{ error: "Transaction not found" },
						{ status: 404 },
					);
				}
			}
		}

		return NextResponse.json({}, { status: 202 });
	}
	return NextResponse.json({}, { status: 400 });
}
