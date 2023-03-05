import * as AdminService from "./user/user.service";

import { User } from "@prisma/client";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// Find user matching the email and verify their password
module.exports = function (passport: PassportStatic) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async function verify(email: string, password: string, cb: Function) {
                try {
                    const user = await AdminService.findUserByEmail(email);

                    if (!user) {
                        return cb(null, false, { message: "Incorrect email" });
                    } else if (user.password !== password) {
                        return cb(null, false, { message: "Incorrect password" });
                    }

                    return cb(null, user);
                } catch (err: any) {
                    return cb(err);
                }
            }
        )
    );

    // Serialize and store user session information
    passport.serializeUser((user: User, cb) => {
        cb(null, user.id);
    });

    // Deserialize user information from session storage
    passport.deserializeUser(async (userId: number, cb) => {
        try {
            const user = await AdminService.findUserByID(userId);
            const { email, first_name, last_name } = user;

            return cb(null, { email, first_name, last_name });
        } catch (err: any) {
            return cb(err);
        }
    });
};
