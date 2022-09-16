import { Request, Response } from "express";
import statsService from "../services/stats.service"


export default async function statsController(_req: Request, res: Response) {
    try {
        const data = statsService();
        return res.status(200).json({
            data
        })
    } catch (error: any) {
        return res.status(400).json({
            error: 400,
            message: error.message
        });
    }
}