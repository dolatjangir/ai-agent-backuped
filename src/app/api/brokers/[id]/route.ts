// app/api/brokers/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/brokers/:id - Get single broker
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    const broker = await prisma.broker.findUnique({
      where: { id }
    });
    
    if (!broker) {
      return NextResponse.json(
        { error: 'Broker not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(broker);
  } catch (error) {
    console.error('Error fetching broker:', error);
    return NextResponse.json(
      { error: 'Failed to fetch broker' },
      { status: 500 }
    );
  }
}

// PUT /api/brokers/:id - Update broker
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params
    const body = await request.json();
       // Check if broker exists
    const existingBroker = await prisma.broker.findUnique({
      where: { id }
    });
    
    if (!existingBroker) {
      return NextResponse.json(
        { error: 'Broker not found' },
        { status: 404 }
      );
    }

    const broker = await prisma.broker.update({
      where: { id },
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
    
    return NextResponse.json(broker);
  } catch (error) {
    console.error('Error updating broker:', error);
    return NextResponse.json(
      { error: 'Failed to update broker' , details: error instanceof Error ? error.message : 'Unknown error'  },
      { status: 500 }
    );
  }
}

// DELETE /api/brokers/:id - Delete broker
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
     // Check if broker exists
    const existingBroker = await prisma.broker.findUnique({
      where: { id }
    });
    
    if (!existingBroker) {
      return NextResponse.json(
        { error: 'Broker not found' },
        { status: 404 }
      );
    }

    await prisma.broker.delete({
      where: { id }
    });
    
    return NextResponse.json(
      { message: 'Broker deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting broker:', error);
    return NextResponse.json(
      { error: 'Failed to delete broker', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}