import User from "../../models/Users/User.mjs";
import { responseHelper } from "../../utilis/responseHelper.mjs";
import { statusHelper } from "../../utilis/statusHelper.mjs";
export const postUser = async (req, res) => {
  const { body } = req;
  const { name, email, username } = body;
  //   console.log("name",name)
  try {
    const user = await User.findOne({email})
    if(user){
        return res.status(statusHelper(3)).json(responseHelper(false,"This user is already available",null))
    }
    const newUser = new User({
      name,
      email,
      username,
    });
    console.log("newUser", newUser);
    await newUser.save();
    return res.status(statusHelper(1)).json(responseHelper(true,"new user added",newUser))
    // return res.status(200).json({ user: newUser });
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,"error while adding new user", null))

    // return res.status(400).json({ error: error });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
        return res.status(statusHelper(1)).json(responseHelper(true,"user",user))
    //   return res.status(200).json({ user: user });
    } else {
        return res.status(statusHelper(4)).json(responseHelper(false,"This user is not avialable",null))
    }
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,"error while fetching user", null))
    // return res.status(400).json({ error: error });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(statusHelper(1)).json(responseHelper(true,"All Users",users))

    // return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,"error while all fetching user", null))

    // return res.status(400).json({ error: error });
  }
};

export const putUser = async (req, res) => {
  const { body } = req;
  const { name, username, email } = body;
  const { id } = req.params;

//   const user = await User.findOne({email})
//   if(user){
//     return res.status(statusHelper(3)).json(responseHelper(false,"This user is already available",null))
// }


  try {
    const newUser = {
      name,
      username,
      email,
    };

    const updatedUser = await User.findByIdAndUpdate(id, newUser);
    return res.status(statusHelper(1)).json(responseHelper(true,"user info updated",updatedUser))
    // return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,"error while updating user", null))

    // return res.status(400).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(statusHelper(1)).json(responseHelper(true,"user deleted",deletedUser))

    // return res.status(200).json({ user: deletedUser });
  } catch (error) {
    // return res.status(400).json({ error: error });
    return res.status(statusHelper(2)).json(responseHelper(false,"error while deleting user", null))

  }
};

export const deleteAllUser = async (req, res) => {
  try {
    const deleteAll = await User.deleteMany({});
    console.log("deleteAll", deleteAll);
    return res.status(statusHelper(1)).json(responseHelper(true," all user deleted",deleteAll))

    // return res.status(200).json({ user: deleteAll });
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,"error while deleting all user", null))

    // return res.status(400).json({ error: error });
  }
};
