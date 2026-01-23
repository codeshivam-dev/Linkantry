"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onboardUser = async () => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        success: false,
        message: "User not found",
      };

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (existingUser) {
      return {
        success: true,
        message: "User already onboarded",
      };
    }
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        avatarUrl: user.imageUrl || "",
      },
    });
    return {
      success: true,
      message: "User onboarded successfully",
    };
  } catch (error) {
    console.error("Error onboarding user:", error);
    return {
      success: false,
      message: "An error occurred during onboarding",
    };
  }
};
