import type { Request, Response, NextFunction } from "express";

/**
 * Checks if user is authorized to make an API call before
 * continuing to process their request.
 *
 * @returns Http response with status HTTP.UNAUTHORIZED
 */
export const isValidUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ status: 401, message: "You are not authorized to make these changes" });
    }

    next();
};
