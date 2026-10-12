const { MongoClient } = require("./node_modules/mongodb");
const fs = require("fs");
const path = require("path");

const uri = "mongodb+srv://velexinfotech_db_user:SceA0aI6CLKaMrJ7@cluster0.dnk6kyu.mongodb.net/velex_infotech?retryWrites=true&w=majority";

// Import blog posts metadata list directly
const { blogPosts } = require("./content/blog/index.ts"); // Wait, index.ts is TS. Let's parse index.ts or import statically.
