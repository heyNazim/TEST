import { comparePassword, hashPassword } from "../helpers/userHelper.js";
import otpModel from "../model/otpModel.js";
import userModel from "../model/userModel.js";
import nodemailer from "nodemailer";
// import twilio from "twilio";

// Register--------------------------------------------------------||
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password || !phone) {
      return res.status(200).send({
        success: false,
        message: "Plzz fill all felds",
      });
    }
    
    //  existing user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: `This ${existinguser.email} already registered`,
      });
    }

    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone
    }).save();
    res.status(201).send({
      success: true,
      message: `${user.name} Register Successfully`,
      user,
    });

    //   Nodemailer
    // var transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "nazim.saifi1908@gmail.com",
    //     pass: `${process.env.NODEMAILER_MY_PASS}`,
    //   },
    // });

    // var mailOptions = {
    //   from: "nazim.saifi1908@gmail.com",
    //   to: `${user.email}`,
    //   subject: "Sending Email using Node.js",
    //   text: "That was easy!",
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    // Twilio sms
    // const accountSid = process.env.ACCOUNT_SID;
    // const authToken = process.env.AUTH_TOKEN;

    // const client = new twilio(accountSid, authToken);

    // client.messages
    //   .create({
    //     body: "Hello from Chat-APP",
    //     to: `+91 ${user.phone}`, // Text your number
    //     from: "+12056191374", // From a valid Twilio number
    //   })
    //   .then((message) => console.log(message.sid));
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Login-----------------------------------------------------------||
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Plzz fill all fields",
      });
    }

    // Existing User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: `${email} Not found`,
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false, 
        message: "Invalid Password",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


// email send an password change otp
export const emailsend = async(req,res)=>{
  try {
    const {email} = req.body;
    if(!email){
      return res.status(200).send({
        success:false,
        message:"Please enter Your email first"
      })
    }
    const data = await userModel.findOne({email})
    if(data){
    let  otp = Math.floor((Math.random()*10000)+1);
    
    const otpdata =  await new otpModel({email, code:otp, expireIn: new Date().getTime()+ 300*1000}).save()

emailsendfunction(email, otp)
      res.status(200).send({
        success:true,
        message:"plese check your email",
        data:{otpdata, data}
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"something went wrong",
      error
    })
  }
}

function emailsendfunction(email,otp){
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nazim.saifi1908@gmail.com",
      pass: `${process.env.NODEMAILER_MY_PASS}`,
    },
  });
  var mailOptions = {
    from: "nazim.saifi1908@gmail.com",
    to: `${email}`,
    subject: "Resett password one ime asssword",
    text: `this is your ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}


// change password
export const changepassword = async(req,res)=>{
  try {
    const {code, email, password} = req.body;
    let data = await otpModel.findOne({email})
    if(data){
      let currentTime = new Date().getTime()
      let diff = data.expireIn - currentTime
 if(diff>0){
   res.status(200).send({
     message:`Token expire`
   })
 }else{
    const user = await userModel.findOne({email})
    
   const hashedpassword = await  hashPassword(password)
    user.password = hashedpassword
    user.save();
    res.status(200).send({
      message:'password changed'
    })
 }
    }else{
      res.status(200).send({
        message:'cannot get data'
      })
    }
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"something went wrong",
      error
    })
  }
}

// All Chats-------------------------------------------------------||
export const allUsers = async(req,res)=>{
  try {
    console.log('nazi saifi', req.body)
    const {name, email, phonelt, phonegt }=req.body.fields;
    // let allusers = await userModel.find({})
    // let allusers = await userModel.find({ phone: { $gte: phonegt, $lte: phonelt } },{name:name}, {email:email})
    let obj={}
    if(name || email){
      obj["$or"] = []
      if(name){
        obj["$or"].push({name:{$regex:name || "", $options:"i"}})
      }if(email){
        obj["$or"].push({email:{$regex:email || "", $options:"i"}})
      }
    }
    console.log( obj["$or"])
let sahil = await userModel.aggregate([{$match:obj}]) 
console.log(sahil)
    if(sahil){
      res.status(200).send({
        success:true,
        message:"Get all users successfully",
        data:sahil
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Something went wrong",
      error
    })
  }
}


// Single chat-------------------------------------------------------||
export const singleChat = async(req,res)=>{
  try {
    let data = await userModel.findOne({_id: req.params.id})
if(data){
  res.send(data)
}
  } catch (error) {
    console.log(error)
      res.status(500).send({
        success:false,
        message:"Something went wrong",
        error
      })
  }
}



// Delete user-------------------------------------------------------||
export const deleteUser = async(req,res)=>{
  try {
    let data = await userModel.findByIdAndDelete({_id: req.params.id})
  res.status(200).send({
    success:true,
    message:`${data.name} Delete successfully`
  })
  } catch (error) {
    console.log(error)
      res.status(500).send({
        success:false,
        message:"Something went wrong",
        error
      })
  }
}

