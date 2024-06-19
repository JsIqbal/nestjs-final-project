import { MiddlewareConsumer } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class AppModule {
    private configService;
    constructor(configService: ConfigService);
    configure(consumer: MiddlewareConsumer): void;
}
