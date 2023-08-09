const Profile = require("../models/profile");

module.exports.DisplayProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.status(200).json({ success: true, profile });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.CreateProfile = async (req, res, next) => {
  try {
    const {
      user_id,
      user_type,
      full_name,
      profile_picture,
      bio,
      location,
      phone,
      website,
      verified,
      verified_doc,
      agreement,
      created_at,
    } = req.body;
    const profile = await Profile.create({ 
      user_id,
      user_type,
      full_name,
      profile_picture,
      bio,
      location,
      phone,
      website,
      verified,
      verified_doc,
      agreement,
      created_at,
    });
    res.status(200).json({ success: true, profile });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.UpdateProfile = async (req, res, next) => {
  try {
    const {
      user_id,
      user_type,
      full_name,
      profile_picture,
      bio,
      location,
      phone,
      website,
      verified,
      verified_doc,
      agreement,
      created_at,
    } = req.body;
    const Profile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        user_id,
        user_type,
        full_name,
        profile_picture,
        bio,
        location,
        phone,
        website,
        verified,
        verified_doc,
        agreement,
        created_at,
      },
      { new: true }
    );
    res.status(200).json({ success: true, Profile });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.DeleteProfile = async (req, res, next) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Profile deleted" });
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports.FindProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({ id });
    
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    
    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};