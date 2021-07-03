import { createServer } from "http";
import app from './express'

export const httpServer = createServer(app);