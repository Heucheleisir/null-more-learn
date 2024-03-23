import express, { Application, Request, Response, NextFunction } from 'express'
import Redis from "@common/redis";
import { oauthSign } from "@common/jsonwebtoken";
import OauthController from "@controller/OauthController"


const router = express.Router();

router.use("/", OauthController);

export default router