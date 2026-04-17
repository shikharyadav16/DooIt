import api from "./api";

async function request(endPoint, payload) {
    try {
        const response = await api.post(`/auth/${endPoint}`, payload);
        return response.data

    } catch (err) {
        console.log("Login Error:", err);
        return err?.response?.data
    }
}

/**
 * @description Login user
 * @route POST /api/auth/login
 * @param {Object} payload - User credentials
 * @param {string} payload.email - User email
 * @param {string} payload.password - User password
 * @returns {Promise<{success: boolean, data?: {user: { _id: string, name: string, email: string }}, error?: any}>}
 */

export const login = (payload) => request("login", payload)

/**
 * @description Signup user
 * @route POST /api/auth/signup
 * @param {Object} payload - User credentials 
 * @param {string} payload.email - User email
 * @param {string} payload.password - User password
 * @returns {Promise<{success: boolean, data?: {message: string}, error?: any}>}
 */

export const signup = (payload) => request("signup", payload)

/**
 * @description Verify Signup OTP
 * @route POST /api/auth/signup/otp
 * @param {Object} payload - Otp payload
 * @param {number} payload.otp - OTP
 * @param {string} payload.email - User email 
 * @returns {Promise<{success: boolean, data?:{user: {_id: string, name: string, email: string}}, error?: any}>}
 */

export const verifySignup = (payload) => request("signup/otp", payload);

export const checkMe = async() => {
    try {
        const response = await api.get("/me");
        return response.data

    } catch (err) {
        return err?.response?.data;
    }
}