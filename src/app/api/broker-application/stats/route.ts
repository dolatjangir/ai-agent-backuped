// app/api/broker-applications/stats/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';


export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [
      total,
      pending,
      approved,
      rejected,
      todayCount
    ] = await Promise.all([
      prisma.brokerApplication.count(),
      prisma.brokerApplication.count({ where: { status: 'pending' } }),
      prisma.brokerApplication.count({ where: { status: 'approved' } }),
      prisma.brokerApplication.count({ where: { status: 'rejected' } }),
      prisma.brokerApplication.count({
        where: {
          submittedAt: {
            gte: today
          }
        }
      })
    ]);
    
    return NextResponse.json({
      total,
      pending,
      approved,
      rejected,
      today: todayCount
    });
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}