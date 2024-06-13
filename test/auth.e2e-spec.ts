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

    it("Handles a signup request", async () => {
        const res = await request(app.getHttpServer())
            .post("/auth/signup")
            .send({
                email: "k@k.com",
                password: "asdfg",
            })
            .expect(201);
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toBeDefined();
    });

    it("Gets a signedin user", async () => {
        const email = "k@k.com";

        const res = await request(app.getHttpServer())
            .post("/auth/signup")
            .send({
                email,
                password: "123asdf",
            })
            .expect(201);

        const cookie = res.get("Set-Cookie");

        await request(app.getHttpServer())
            .get("/auth/whoami")
            .set("Cookie", cookie)
            .expect(200)
            .then(({ body }) => {
                expect(body.email).toEqual(email);
            });
    });
});
