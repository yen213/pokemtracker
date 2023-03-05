import express from "express";

import { PassportStatic } from "passport";

module.exports = function (passport: PassportStatic) {
    const router = express.Router();

    // Logs in a user and saves their data to session
    router.post("/login", (req, res, next) => {
        passport.authenticate("local", { successRedirect: "/" }, (err: any, user: Express.User) => {
            if (err) {
                return next(err);
            } else if (!user) {
                res.status(400).json({
                    status: 400,
                    message: "Could not find any user with the provided info. Please make all information is correct.",
                });
            } else {
                req.login(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).json({
                        status: 200,
                        message: "Successfully authenticated",
                    });
                });
            }
        })(req, res, next);
    });

    /**
     * Incase we want to see the data stored in the session, call this API
     *   ** Sensitive info like password is not saved in this object **
     */
    router.get("/user", (req, res) => {
        if (!req.user) {
            return res.status(400).json({ message: "User session data not found" });
        }

        return res.status(200).json({
            status: 200,
            message: "Successfully retried user data from session",
            data: req.user,
        });
    });

    // Logs out a user and invalidates their session
    router.post("/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }

            return res.status(200).json({ status: 200, message: "Successfully signed out" });
        });
    });

    return router;
};
