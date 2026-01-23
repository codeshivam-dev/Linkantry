"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function checkProfileUsernameAvailability(username: string) {
  const existing = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
  });

  if (!existing) {
    return { available: true };
  }

  const suggestions = [
    `${username}1`,
    `${username}2`,
    `${username}_`,
    `${username}-`,
  ];

  return { available: false, suggestions };
}

export async function claimUsername(username: string) {
  const loggedInuUser = await currentUser();
  if (!loggedInuUser) {
    return { success: false, error: "User not logged in" };
  }
  try {
    await prisma.user.update({
      where: {
        clerkId: loggedInuUser.id,
      },
      data: {
        username: username.toLowerCase(),
        createdAt: new Date(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error claiming username:", error);
    return { success: false };
  }
}

export const getCurrentUsername = async () => {
  const user = await currentUser();

  const currentUsername = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
    select: {
      username: true,
    },
  });

  return currentUsername;
};
