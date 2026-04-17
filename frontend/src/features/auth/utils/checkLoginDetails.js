export default function checkLoginDetails({ email, password }) {
    if (!email || !password) {
        return { success: false, message: "Please fill all the fields" }
    }
    if (!email.includes("@")) {
        return { success: false, message: "Please enter a valid email" }
    }
    if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters long" }
    }
    return { success: true, data: { email, password } }
}