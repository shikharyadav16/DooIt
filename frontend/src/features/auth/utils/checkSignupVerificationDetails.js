export default function({otp, email}) {
    if (!email || !email.includes("@")) {
        return { success: false, message: "Please enter a valid email" }
    }
    if (!otp || isNaN(otp)) {
        return { success: false, message: "Please enter a valid email" }
    }
    return { success: true }
}