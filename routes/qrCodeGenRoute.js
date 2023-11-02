import { Router } from "express";
import { qrCodeGenerator } from "../controller/qrCodeController.js";


export const QrRouter =Router()

QrRouter.get('/',qrCodeGenerator)