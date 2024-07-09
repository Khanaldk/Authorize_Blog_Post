const models = require("../models");

const BlogController = {};

BlogController.createBlog = async (req, res) => {
  const blogData = {
    title: req.body.title,
    content: req.body.content,
    userId: req.user.userId,
  };

  const newBlog = await models.Blog.create(blogData);
  if (newBlog) {
    return res.status(200).json({
      message: "blog created successfully!",
      blog: blogData,
    });
  }
};

BlogController.getAllBlog = async (req, res) => {
  const blogData = await models.Blog.findAll();
  if (blogData) {
    return res.status(200).json({
      message: "All blogs retrieved successfully!",
      blog: blogData,
    });
  }
};

BlogController.getBlogById = async (req, res) => {
  const blogId = req.params.blogId;
  const checkId = await models.Blog.findOne({ where: { id: blogId } });
  if (!checkId) {
    return res.status(404).json({
      message: "blog not found",
    });
  }
  const blogData = await models.Blog.findOne({ where: { id: blogId } });
  if (blogData) {
    return res.status(200).json({
      message: "Blog retrieve successfully",
      blog: blogData,
    });
  }
};

BlogController.updateBlogById = async (req, res) => {
  const blogId = req.params.blogId;
  const checkId = await models.Blog.findOne({ where: { id: blogId } });
  if (!checkId) {
    return res.status(404).json({
      message: "blog not found",
    });
  }
  const updateBlogData = {
    title: req.body.title,
    content: req.body.content,
  };
  const blogData = await models.Blog.update(updateBlogData, {
    where: { id: blogId },
  });
  if (blogData) {
    return res.status(200).json({
      message: "Blog updated successfully",
      Updatedblog: updateBlogData,
    });
  }
};

BlogController.deleteBlogById = async (req, res) => {
  const blogId = req.params.blogId;
  const checkId = await models.Blog.findOne({ where: { id: blogId } });
  if (!checkId) {
    return res.status(404).json({
      message: "blog not found",
    });
  }
  const blogData = await models.Blog.destroy({ where: { id: blogId } });
  if (blogData) {
    return res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
    });
  }
};

BlogController.getBlogAllLikesById = async (req, res) => {
  const blogId = req.params.blogId;
  const checkId = await models.Blog.findOne({ where: { id: blogId } });
  if (!checkId) {
    return res.status(404).json({
      message: "blog not found",
    });
  }
  const blogData = await models.Blog.findAndCountAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: models.Like,
      as: "Likes",
      attributes: ["userId"],
    },

    where: { id: blogId },
  });
  if (blogData) {
    return res.status(200).json({
      message: "Blog's like retrieve successfully",
      blog: blogData,
    });
  }
};

module.exports = BlogController;
