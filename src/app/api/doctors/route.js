import { NextResponse } from 'next/server';
import { doctors } from '@/lib/mockData';

export async function GET() {
    try {
        // Return mock data for now to fix the 500 error from the external server
        return NextResponse.json(doctors);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
    }
}
