import { async } from "rxjs";

export const validateEmail = (email: string) => {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
}

export const promoCodeValidator = async (promoValue: string) => {
    if(!promoValue) {
        return true;
    }
    const promoCode: {code: boolean} =  await $fetch(
        `/api/check_promo_code?promo_card_code=${ promoValue }`
    );
    return promoCode.code;
}