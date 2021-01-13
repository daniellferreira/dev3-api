import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller('test')
export class TestController {

    @Get('')
    public getTestResponse(_: Request, res: Response): void {
        res.send({ success: true, hello: 'world' })
    }
}