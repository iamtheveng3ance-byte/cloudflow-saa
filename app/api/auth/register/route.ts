import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password, orgName } = await req.json();

    if (!email || !password || !orgName) {
      return NextResponse.json(
        { error: "Email, password, and organization name are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create Organization, User, and Membership in a single transaction
    const slug = orgName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        memberships: {
          create: {
            role: "ADMIN",
            organization: {
              create: {
                name: orgName,
                slug,
              },
            },
          },
        },
      },
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    });

    // Generate JWT Token
    const token = generateToken({ userId: newUser.id, email: newUser.email });

    return NextResponse.json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          organization: newUser.memberships[0]?.organization,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}