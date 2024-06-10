import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/ (GET)", () => {
        return request(app.getHttpServer())
            .post("/auth/signup")
            .send({
                email: "krfthdak2@k.com",
                password: "kdjrhgu",
            })
            .expect(201)
            .then((res) => {
                const { id, email } = res.body;

                expect(id).toBeDefined();
                expect(email).toBeDefined();
            });
    });
});
