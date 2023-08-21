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

export const updatePromoCode = async (promoValue: string) => {
    if(!promoValue) {
        return true;
    }
    const promoCode: {code: boolean} =   await $fetch(`/api/update_promo_card_usage?promo=${ promoValue }`);
    return promoCode.code;
}