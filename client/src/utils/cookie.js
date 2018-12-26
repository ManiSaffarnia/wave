export const deleteCookie = (tokenName) => {
    document.cookie = tokenName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}