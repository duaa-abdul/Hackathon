import Style from "../models/hijabModel.js";

export const getAllStyles = async (req, res) => {
  try {
    const styles = await Style.find({});
    
    console.log(styles);
    
    res.status(200).json({styles});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

