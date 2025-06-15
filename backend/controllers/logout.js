export default function logout (req, res) {
    try{res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });}
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}