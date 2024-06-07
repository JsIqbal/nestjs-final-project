import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";

interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) { // as long a class is coming its ok.
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Something I want to run before the request
        // console.log("I am running before request! ", context);

        return next.handle().pipe(
            map((data:any) => {
                // I am running before sending the response back!
                // console.log("I am running before sending in the response!", data);

                return plainToClass(this.dto, data, {
                    excludeExtraneousValues : true,
                })
            }) 
        )
    }
} 