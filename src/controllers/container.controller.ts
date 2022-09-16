import { Request, Response } from "express";
import containerService from "../services/container.service";

export default async function containerController(req:Request, res: Response) {
  try {
    const { body } = req;
    const data = containerService(body);
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(400).json({
      error: 400,
      message: error.message
  });
  }
}
