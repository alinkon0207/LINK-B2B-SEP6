import User from "../models/Users.js";

export const verifyLinkTag = async (req, res) => {
  const { tag } = req.query;

  try {
    const linkTagFound = await User.findOne({ linkTag: tag });

    if (!linkTagFound)
      return res.status(404).json({ status: false, message: "invalid" });

    res.status(200).json({ status: true, message: "valid" });
  } catch (error) {
    res.status(404).json({ status: false, message: "invalid" });
  }
};
