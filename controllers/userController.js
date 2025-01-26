import User from "../models/userModel.js";


const generateToken = (user) => {
    const accessToken = jwt.sign(
        { userID: user._id },
        process.env.ACCESS_TOKEN_SECREAT,
        { expiresIn: "1d" }
    )
    const refressToken = jwt.sign(
        { userID: user._id },
        process.env.REFRESS_TOKEN_SECREAT,
        { expiresIn: "5d" }
    )


    return { accessToken, refressToken }

}

const loginORsignup = async (req, res) => {
    const { phone, address } = req.body;

    try {
        let user = await User.findOne({ phone });
        if (!user) {
            user = new User({ phone, address });
            await user.save();
        } else {
            user.address = address;
            await user.save();
        }


        const { accessToken, refressToken } = generateToken(user.toObject());
        res.status(200).json({ accessToken, refressToken })

    } catch (error) {
        console.log("error in Connection", error);
        res.status(500).json({ msg: "Error in Connecting the server" })

    }

}


export default loginORsignup;