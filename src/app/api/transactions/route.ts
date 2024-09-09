import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {

    const transactions = await prisma.transaction.findMany();

    return NextResponse.json({transactions}, { status: 201 });
}

// POSTメソッド
export async function POST(req: NextRequest) {
    let { description, amount, category, date } = await req.json();
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
}