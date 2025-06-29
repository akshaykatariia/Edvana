import { Webhook } from "svix";
import User from "../models/User.js";

// Api controller function to manage clerk user with db

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);  //key 
    //is stored in env so using it as instance to verify it came from clerk  

    await whook.verify(JSON.stringify(req.body), {   // now this is a sequrity check to knwo it is real or fake
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;// after verify we extract data like uerid , email 
    // and type to know , if user created or delted  

    switch(type){
        case 'user.created' :{
            // storing data now 
            const userData = {
                _id: data.id,
                email : data.email_addresses[0].email_address,
                name: data.first_name + " " + data.last_name,
                imageUrl: data.image_url,
            }
            await User.create(userData)
            res.json({})
            break;
        }
        case'user.updated':{
            const userData = {
                _id: data.id,
                email : data.email_addresses[0].email_address,
                name: data.first_name + " " + data.last_name,
                imageUrl: data.image_url,
            }
            await User.findByIdAndUpdate(data.id, userData)
            res.json({})
            break;
        }

        case 'user.deleted' : {
            await User.findByIdAndDelete(data.id);
            res.json({})
            break;
        }

        default: 
        break;
    }
  } catch (error) {
    res.json({sucess:false, message: error.message})
  }
};

