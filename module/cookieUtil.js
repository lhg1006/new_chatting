import Cookies from 'js-cookie';

export const getCookie = (cName) => {
    return Cookies.get(cName);
}

export const setCookie = ({cName, cValue}) => {
    Cookies.set(cName, cValue)
}

export const updCookie = async ({cName, cValue}) => {
    Cookies.remove(cName)
    Cookies.set(cName, cValue);
};
export const delCookie = () => {
    ['userId', 'userNick'].forEach(cName => Cookies.remove(cName));
}