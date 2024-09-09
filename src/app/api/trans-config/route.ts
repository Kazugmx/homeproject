import { NextResponse, type NextRequest } from "next/server";
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    return NextResponse.json({}, { status: 405 });
}
// POSTメソッド
export async function POST(req: NextRequest) {
    let payload: { type: string, ID: number };
    try {
        payload = await req.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    let { type, ID } = payload;
    ID = Number(ID);
    if (type === "delete") {
        try {
            const deletedTransaction = await prisma.transaction.delete({
                where: {
                    id: ID,
                },
            });
            return NextResponse.json(deletedTransaction, { status: 202 });
        } catch (error) {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            if ((error as any) instanceof Prisma.PrismaClientKnownRequestError && (error as any).code === "P2025") {
                return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
            }
        }
    }
    return NextResponse.json({}, { status: 200 });
}