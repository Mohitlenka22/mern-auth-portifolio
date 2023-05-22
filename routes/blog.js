import express from "express";
import Blog from "../models/blogSchema.js";
import fs from 'fs';

const blogRouter = express.Router();

blogRouter.route("/blog/:blogname")
    .get(async (req, res) => {
        const blog = await Blog.findOne({ blogname: req.params.blogname });
        const buffer = Buffer.from(blog.blogFile);
        const fileName = buffer.toString("utf8");
        fs.readFile(fileName, { encoding: "utf8" }, (err, data) => {
            res.send(data);
        })
        // res.json(data);
    })
    .post(async (req, res) => {
        const { blogContent } = req.body;
        const blogname = req.params.blogname;
        const blogFile = 'example.txt';
        const fileData = 'Hello, world!';
        fs.writeFile(blogFile, fileData, { encoding: "utf8" }, (err) => {
            console.log(err);
        });
        if (!blogname || !blogContent) {
            res.status(401).json({ "message": "Fill Feilds Properly" });
        }
        try {
            const blog = await Blog.findOne({ blogname: blogname });
            if (blog) {
                res.status(401).send("Blog already Present");
            }
            const newBlog = new Blog({ blogname, blogContent, blogFile });
            const result = await newBlog.save();
            if (!result) {
                res.status(500).send("Error Occured");
            }
            res.status(201).send("Blog Created");
        } catch (error) {
            res.send(401).send("Error Occured");
        }

    })

export default blogRouter;