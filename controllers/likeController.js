const models = require("../models");

const LikeController = {};

LikeController.likeBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const checkId = await models.Blog.findOne({ where: { id: blogId } });
  if (!checkId) {
    return res.status(404).json({
      message: "blog not found",
    });
  }
  const likeData = {
    blogId: blogId,
    userId: req.user.userId,
  };
  const createLike = await models.Like.create(likeData);
  if (createLike) {
    return res.status(200).json({
      message: `Blog liked by userId:${likeData.userId}.`,
    });
  }
};

module.exports = LikeController;
