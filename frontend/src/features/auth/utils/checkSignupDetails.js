export default function checkSignupDetails({ name, email, password, confirmPass }) {

    if (!email || !name || !password || !confirmPass) {
        return { success: false, message: "Please fill all the fields" }
    }
    if (!email.includes("@")) {
        return { success: false, message: "Please enter a valid email" }
    }
    if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters long" }
    }
    if (password !== confirmPass) {
        return { success: false, message: "" }
    }
    return { success: true, data: { name, email, password } }
}