import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Always return success to prevent email enumeration
    const successResponse = NextResponse.json({
      message: "If an account with that email exists, a reset link has been sent.",
    });

    if (!email) return successResponse;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      console.log(`[Password Reset] No user found for email: ${email}`);
      return successResponse;
    }

    console.log(`[Password Reset] User found: ${user.email} (ID: ${user.id})`);

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    console.log(`[Password Reset] Token created for user: ${user.email}`);

    try {
      await sendPasswordResetEmail(user.email, token);
      console.log(`[Password Reset] Email sent successfully to: ${user.email}`);
    } catch (emailError) {
      console.error(`[Password Reset] Failed to send email to ${user.email}:`, emailError);
      // Still return success to prevent email enumeration, but log the error
    }

    return successResponse;
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({
      message: "If an account with that email exists, a reset link has been sent.",
    });
  }
}
