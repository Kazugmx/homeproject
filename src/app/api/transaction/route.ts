import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function route(
    req: NextRequest
) {
    if (req.method === "GET") {
        return NextResponse.json({ message: "データを取得!" }, { status: 201 });
    }
    if (req.method === "POST") {
        const { description, amount, category, date } = await req.json();
        const newTransaction = await prisma.transaction.create({
            data: {
                description,
                amount,
                category,
                date: new Date(date),
            },
        });
        return NextResponse.json(newTransaction, { status: 201 });
    }
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
