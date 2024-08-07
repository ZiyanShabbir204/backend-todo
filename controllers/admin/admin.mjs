import Admin from "../../models/admin/Admin.mjs";
import bcrypt from "bcrypt";
import generateWebTokenAndSetCookies from "../../utilis/generateToken.mjs";
export const signup = async (req, res) => {
  const { body } = req;
  const { fullname, username, password } = body;
  if (!fullname || !username || !password) {
    return res.status(400).json({ error: "invalid fields" });
  }
  try {
    const admin = await Admin.findOne({username});
    if(admin){
        return res.status(400).json({error:"User already exists"})
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      fullname,
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    return res.status(200).json({ admin: newAdmin });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const login = async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "invalid fields" });
    }
    const admin = await Admin.findOne({username});
    console.log("admin",admin)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin?.password || " "
    );
    if (!isPasswordCorrect || !admin) {
      res.status(400).json({ error: "Incorrect Credientials" });
    }
    generateWebTokenAndSetCookies(admin._id,res)
    // console.log("token",token)
    // res.json({token})

    return res.status(200).json({
      admin: {
        _id: admin._id,
        fullname: admin.fullname,
        username: admin.username,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
