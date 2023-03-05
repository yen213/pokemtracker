import { check, validationResult } from "express-validator";

import type { Request, Response, NextFunction } from "express";

// Validation rules for Pokemon objects we receive through the APIs
export const pokemonValidator = [
    check("name")
        .isAlpha()
        .withMessage("Only letters are allowed")
        .trim()
        .not()
        .isEmpty()
        .toLowerCase()
        .withMessage("A non-empty string of letters is required"),
    check("dex_number")
        .custom((value) => {
            if (typeof value !== "number") {
                return false;
            }

            return true;
        })
        .withMessage("Number is required"),
    check("type_1")
        .isAlpha()
        .withMessage("Only letters are allowed")
        .trim()
        .not()
        .equals("any")
        .withMessage("Type 1 cannot be 'any'")
        .not()
        .isEmpty()
        .toLowerCase()
        .withMessage("A non-empty string of letters is required"),
    check("type_2")
        .isAlpha()
        .withMessage("Only 'null' or letters are allowed")
        .trim()
        .toLowerCase()
        .optional({ nullable: true })
        .withMessage("Must be 'null' or a non-empty string of letters"),
    check("image_url").not().isEmpty().withMessage("A non-empty string is required"),
];

// Validates a Pokemon request objects. Invalidate request if validation doesn't pass.
// Else continue tp process the request
export const pokemonValidatorResult = (req: Request, res: Response, next: NextFunction) => {
    const validationRes = validationResult(req);

    if (!validationRes.isEmpty()) {
        return res.status(400).json({ error: validationRes.array() });
    }

    next();
};
