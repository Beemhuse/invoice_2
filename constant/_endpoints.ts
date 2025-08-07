export const AUTH_ENDPOINTS ={
    LOGIN: "/auth/login/",
    REGISTER: "/auth/register/",
    RESEND_OTP: "/auth/resend-otp-code/",
    VERIFY_OTP: "/auth/verify/",
    LOGOUT: "/auth/logout/",
    USER_PROFILE: "/auth/user/profile/",
    UPDATE_PROFILE: "/auth/user/update-profile/",
    FORGOT_PASSWORD: "/auth/user/forgot-password/",
    RESET_PASSWORD: "/auth/user/reset-password/",
}

export const MANAGEMENT_ENDPOINTS ={
    _: "/management/customers/",
    CUSTOMERS_ID:(id)=> `/management/customers/${id}`,
}
export const INVOICES_ENDPOINTS ={
    _: "/management/invoices/",
    INVOICES_ID:(id)=> `/management/invoices/${id}`,
}