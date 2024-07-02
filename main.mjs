import { PrismaClient } from "@prisma/client";
import escapeHTML from "escape-html";
import express from "express";
import fs from "node:fs";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
const prisma = new PrismaClient();

const template = fs.readFileSync("./template.html", "utf-8");
app.get("/", async (request, response) => {
    const posts = await prisma.post.findMany();
    const displayMessages = template.replace(
        "<!-- posts -->",
        posts.map((post) => `<li>${escapeHTML(post.message)}</li>`).join("")
    );
    const html = displayMessages.replace(
        "<!-- options -->",
        posts.map((post) => `<option value=${post.id}>id:${post.id}</option>`)
    );
    response.send(html);
});

app.post("/send", async (request, response) => {
    await prisma.post.create({
        data: { message: request.body.message },
    });
    response.redirect("/");
});

app.post("/reaction", async (req, res) => {
    const reactionId = Number(await req.body.reactionId);
    let post = await prisma.post.findUnique({
        where: { id: reactionId },
    });
    if (req.body.reaction === "good") {
        post.good += 1;
    } else if (req.body.reaction === "favorite") {
        post.favorite += 1;
    } else {
        post.bad += 1;
    }
    await prisma.post.update({ where: { id: reactionId }, data: { ...post } });
    res.redirect("/");
});

app.listen(3000);
