import fs from "node:fs";
import express from "express";
import { PrismaClient } from "@prisma/client";
import escapeHTML from "escape-html";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
const prisma = new PrismaClient();

const template = fs.readFileSync("./template.html", "utf-8");
app.get("/", async (request, response) => {
  const posts = await prisma.post.findMany();
  const html = template.replace(
    "<!-- posts -->",
    posts.map((post) => `<li>${escapeHTML(post.message)}</li>`).join(""),
  );
  response.send(html);
});

app.post("/send", async (request, response) => {
  await prisma.post.create({
    data: { message: request.body.message },
  });
  response.redirect("/");
});

const searchTemplate = fs.readFileSync("./searchTemplate.html", "utf-8");
app.post("/search", async (request, response) => {
  const searchPosts = await prisma.post.findMany({
    where: {
      message: {
        contains: request.body.keyword,  
      },
    },
  });

  const searchHtml = searchTemplate.replace(
    "<!-- posts -->",
    searchPosts.map((post) => `<li>${escapeHTML(post.message)}</li>`).join(""),
  );
  
  response.send(searchHtml)
});

app.listen(3000);