const models = require("../models");

async function authorizeUserOrAdmin(req, res, next) {
  const blog = await models.Blog.findByPk(req.params.blogId);
  if (!blog) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (req.user.role === "admin" || blog.userId === req.user.userId) {
    req.blog = blog;
    return next();
  }

  res.status(403).json({ message: "Access denied" });
}

module.exports = authorizeUserOrAdmin;
