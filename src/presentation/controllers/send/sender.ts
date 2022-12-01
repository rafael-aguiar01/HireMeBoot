import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { SendModel } from '../../../domain/models/sendModel'
import { badRequest } from "../../helpers/http-helper";
import { MissingParamError } from "../../errors";

export class SendController implements Controller {
    private readonly sendData: SendModel

    constructor (sendData: SendModel){
        this.sendData = sendData
    } 

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if(!httpRequest.body.cellphone) {
            return badRequest(new MissingParamError("cellphone"))
        }
    }

}