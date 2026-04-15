// app/api/broker-applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const [applications, total] = await Promise.all([
      prisma.brokerApplication.findMany({
        where,
        orderBy: { submittedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.brokerApplication.count({ where })
    ]);
    
    // Parse specializations JSON
    const formattedApplications = applications.map(app => ({
      ...app,
      specializations: JSON.parse(app.specializations)
    }));
    
    return NextResponse.json({
      applications: formattedApplications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });
    
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}




export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const companyName = formData.get('companyName') as string;
    const role = formData.get('role') as string;
    const experience = formData.get('experience') as string;
    const dealsClosed = formData.get('dealsClosed') as string;
    const location = formData.get('location') as string;
    const specializations = formData.get('specializations') as string; // JSON string
    const description = formData.get('description') as string;
    const profileImage = formData.get('profileImage') as File | null;
    
    // Validation
    if (!fullName || !email || !phone || !companyName || !role || !experience || !location || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existing = await prisma.brokerApplication.findFirst({
      where: { email }
    });
    
    if (existing) {
      return NextResponse.json(
        { error: 'Application with this email already exists' },
        { status: 409 }
      );
    }
    
    // Handle image upload
    let profileImageUrl = null;
    if (profileImage && profileImage.size > 0) {
      const bytes = await profileImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create uploads directory if not exists
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'brokers');
      await mkdir(uploadDir, { recursive: true });
      
      // Generate unique filename
      const filename = `${Date.now()}-${profileImage.name.replace(/\s/g, '-')}`;
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      profileImageUrl = `/uploads/brokers/${filename}`;
    }
    
    // Create application
    const application = await prisma.brokerApplication.create({
      data: {
        fullName,
        email,
        phone,
        companyName,
        role,
        experience,
        dealsClosed: dealsClosed || null,
        location,
        specializations: specializations || '[]',
        description,
        profileImage: profileImageUrl,
        status: 'pending'
      }
    });
    
    return NextResponse.json({
      success: true,
      application: {
        ...application,
        specializations: JSON.parse(application.specializations)
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}