// app/api/brokers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/brokers - Get all brokers
export async function GET() {
  try {
    const brokers = await prisma.broker.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(brokers);
  } catch (error) {
    console.error('Error fetching brokers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brokers' },
      { status: 500 }
    );
  }
}

// POST /api/brokers - Create a new broker
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const broker = await prisma.broker.create({
      data: {
        name: body.name,
        image: body.image || null,
        company: body.company,
        role: body.role,
        location: body.location || '',
        description: body.description || '',
        email: body.email,
        phone: body.phone || '',
        experience: body.experience || '',
         specialization: body.specialization || [] 
      }
    });
    
    return NextResponse.json(broker, { status: 201 });
  } catch (error) {
    console.error('Error creating broker:', error);
    return NextResponse.json(
      { error: 'Failed to create broker' },
      { status: 500 }
    );
  }
}