import User from "../models/userSchema.js";

export default async function resetVerificationToken(req, res) {
    try {
        const {email}= req.body;
        if(!email){
             res.status(400).json({
                success: false,
                error: "Email is required",
                message: "Please provide an email address",
            });
            return
        }
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                success: false,
                error: "User not found",
                message: "No user found with this email address",
            })
            return
        }
        const verificationToken = String(100000 + Math.floor(Math.random() * 100000));
        const verificationTokenExp = Date.now() + 15 * 60 * 1000; // 15 minute expiration
        user.verificationtoken = verificationToken; 
        user.verificationtokenexp = verificationTokenExp;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Verification token reset successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        res.error(400).json({
            success: false,
            error: error.message || "Internal Server Error",
            message: "An error occurred while resetting the verification token",
        });
    }
}