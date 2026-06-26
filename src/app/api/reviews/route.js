import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

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
        
        const database = await getDb();
        
        let query = {};
        if (email) {
            query.userEmail = email;
        }
        
        const reviews = await database.collection("reviews").find(query).sort({ createdAt: -1 }).toArray();
        
        return NextResponse.json({ success: true, data: reviews });
    } catch (error) {
        console.error("GET Reviews Error:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const database = await getDb();
        
        const reviewToInsert = {
            ...data,
            createdAt: new Date().toISOString()
        };
        
        const result = await database.collection("reviews").insertOne(reviewToInsert);
        
        return NextResponse.json({ 
            success: true, 
            data: { ...reviewToInsert, _id: result.insertedId } 
        });
    } catch (error) {
        console.error("POST Review Error:", error);
        return NextResponse.json({ success: false, message: "Failed to submit review" }, { status: 500 });
    }
}
