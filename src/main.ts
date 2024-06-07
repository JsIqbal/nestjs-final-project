import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

const cookieSession = require("cookie-session");

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        cookieSession({
            name: "session",
            keys: [
                /* secret keys */
                "sdfgmnsrdio",
            ],

            // Cookie Options
            // maxAge: 24 * 60 * 60 * 1000, // 24 hours
        })
    );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Security feature to filter out everything from request except expectations
        })
    );

    await app.listen(3000);
})();
