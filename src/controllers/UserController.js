const User = require('../models/User')

class UserController {
  async store (req, res){
    const {name, email} = req.body

    const emailExists = await User.findOne({email: email})

    if(emailExists){
      return res.status(401).json({error: 'User email already exists!'})
    }

    const user = await User.create({
      name,
      email
    })
  
    return res.json(user)
  }

  async index(req, res){  
    const users = await User.find()

    return res.json(users)
  }
  
  async update(req, res){
    console.log(req.params.id)
    const {name, oldEmail, newEmail, confirmEmail} = req.body

    const userExists = await User.findOne({_id: req.params.id})

    if(!userExists){
      return res.status(404).json({error: 'User id not found'})  
    }


    if(oldEmail !== newEmail){
      if(newEmail !== confirmEmail){
        return res.status(400).json({error: "User email does not match"})
      }
    }


    const user = await User.update(
      {_id: req.params.id},
      {
        name,
        email: newEmail
      },
      {new: true}
    )
   

    return res.json(user)
  }

  async delete(req,res){
    const {id} = req.params

    await User.findByIdAndDelete({_id: id})

    return res.json({message: 'User successfully deleted'})

  }
}

module.exports = new UserController();