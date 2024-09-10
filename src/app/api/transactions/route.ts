import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type");
    if (type === "sum") {
        const sum = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
        });
        return NextResponse.json({ sum }, { status: 201 });
    }
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json( {transactions} , { status: 202 });
}

// POSTメソッド
export async function POST(req: NextRequest) {
    try {
        let { description, amount, category, date} = await req.json();
        if (!description || !amount || !category || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        amount = Number(amount);
        const newTransaction = await prisma.transaction.create({
            data: {
                description,
                amount,
                category,
                date: new Date(date),
            },
        });
        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
    }
}