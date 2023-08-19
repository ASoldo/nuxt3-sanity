export const validateEmail = (email: string) => {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
}