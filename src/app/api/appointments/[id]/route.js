import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from "mongodb";

let client;
let db;

async function getDb() {
    if (!db) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db("docappoint");
    }
    return db;
}

export async function PATCH(req, { params }) {
    try {
        // params is a Promise in Next.js 15+, but since this might be 14, we await it just in case
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        const data = await req.json();
        const database = await getDb();
        
        // Exclude _id if it's accidentally in the update data payload
        const { _id, ...updateData } = data;
        
        await database.collection("appointments").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: updateData }
        );
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("PATCH Appointment Error:", error);
        return NextResponse.json({ success: false, message: "Failed to update appointment" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        const database = await getDb();
        await database.collection("appointments").deleteOne({ _id: new ObjectId(id) });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE Appointment Error:", error);
        return NextResponse.json({ success: false, message: "Failed to delete appointment" }, { status: 500 });
    }
}
