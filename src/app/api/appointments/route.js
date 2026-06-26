import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

// Using a simple singleton connection for the API routes
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

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        if (!email) {
            return NextResponse.json({ success: false, message: "Email required" });
        }
        
        const database = await getDb();
        const appointments = await database.collection("appointments").find({ userEmail: email }).toArray();
        
        return NextResponse.json({ success: true, data: appointments });
    } catch (error) {
        console.error("GET Appointments Error:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch appointments" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const database = await getDb();
        const result = await database.collection("appointments").insertOne(data);
        
        // Return the full object with the inserted ID so the UI can use it
        return NextResponse.json({ 
            success: true, 
            data: { ...data, _id: result.insertedId } 
        });
    } catch (error) {
        console.error("POST Appointment Error:", error);
        return NextResponse.json({ success: false, message: "Failed to create appointment" }, { status: 500 });
    }
}
