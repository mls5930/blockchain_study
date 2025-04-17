// 경로: 250416/src/core/server/index.ts

import express, { Express, Request, Response } from "express";
import cors from "cors";
import { MessageType } from "./interface/message.interface";
import path from "path";
import fs from "fs";
import Chain from "@core/chain/chain";
import { Client } from "./client";
import { P2P } from "./p2p";

const createApp = (client: Client, chain: Chain, targetPort: number) => {
    const app: Express = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req: Request, res: Response) => {
        res.send(fs.readFileSync(path.join(__dirname, "./views/index.html"), "utf8"));
    });

    app.get("/chains", (req: Request, res: Response) => {
        client.connect("127.0.0.1", targetPort, MessageType.allBlock);
        res.json(chain.get()); // 응답은 자신의 체인 상태
    });

    app.post("/block/mine", (req: Request, res: Response) => {
        const { data }: { data: string[] } = req.body;
        // node2
        client.connect("127.0.0.1", targetPort, MessageType.addBlock, data);
        res.json(chain.get()); // 블록 생성 후 자신의 체인 상태 응답
    });

    app.get("/block/latestBlock", (req: Request, res: Response) => {
        client.connect("127.0.0.1", targetPort, MessageType.latestBlock);
        res.json(chain.latestBlock());
    });

    return app;
};

export default createApp