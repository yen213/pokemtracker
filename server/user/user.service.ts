import { User } from "@prisma/client";
import { db } from "../prisma/db";

/**
 * Gets a user from the User table
 *
 * @param email Email of the user to make the query for
 *
 * @returns User object representing the DB entry
 */
export const findUserByEmail = async (email: string): Promise<User> => {
    return db.user.findUnique({
        where: { email },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            password: true,
        },
    });
};

/**
 * Gets a user from the User table
 *
 * @param id ID of the user to make the query for
 *
 * @returns User object representing the DB entry
 */
export const findUserByID = async (id: number): Promise<User> => {
    return db.user.findUnique({
        where: { id },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            password: true,
        },
    });
};
