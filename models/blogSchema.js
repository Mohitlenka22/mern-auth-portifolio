import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    blogname: { type: String, required: true, unique: true },
    blogContent: { type: String, required: true },
    blogFile: { type: Buffer }
});

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;