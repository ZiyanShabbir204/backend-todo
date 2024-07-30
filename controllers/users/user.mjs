import User from "../../models/Users/User.mjs";
export const postUser  =  async(req,res)=>{
    const { body } = req;
    const { name, email, username } = body;
    //   console.log("name",name)
    try {
      const newUser = new User({
        name,
        email,
        username,
      });
      await newUser.save();
      return res.status(200).json({ "newUser": newUser });
    } catch (error) {
      return res.status(400).json({ "error": error });
    }
}

export const getUser = async(req,res) =>{
    const {id} = req.params

    try {
        const user = await User.findById(id)
        if(user){
            return res.status(200).json({"user":user})

        }
        else{
            return res.status(404).json({"user":"not available"})
        }
        
        

    } catch (error) {
        return res.status(400).json({"error":error})
        
    }

}

export const getAllUser  = async(req,res)=>{
    try {
        const users  = await User.find()
        return res.status(200).json({"users":users})
    } catch (error) {
        return res.status(400).json({"error":error})
    }


}

export const putUser =  async (req,res)=>{
    const {body} = req
    const {name,username,email} = body
    const {id} = req.params

    try {
        const user  = {
            name,
            username,
            email
        }

        const updatedUser  = await User.findByIdAndUpdate(id,user)
        return res.status(200).json({"user":updatedUser})
        
    } catch (error) {
        return res.status(400).json({ "error": error });
    }

}

export const deleteUser =  async(req,res)=>{
    const {id} = req.params
    try {
        
        const deletedUser = await User.findByIdAndDelete(id)
        return res.status(200).json({"user":deletedUser})
    } catch (error) {
        return res.status(400).json({ "error": error });
    }

}