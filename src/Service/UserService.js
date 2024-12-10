import Cookies from 'js-cookie'

const getSignature = () => {
    const signatureCookie = Cookies.get('newSignature');
    const signatureStorage = localStorage.getItem('newSignature');

    if (signatureStorage) {
        return signatureStorage;
    }

    if (signatureCookie) {
        return signatureCookie;
    }

    const newSignature = crypto.randomUUID()
    Cookies.set('newSignature', newSignature, { expires: 365 });
    localStorage.setItem('newSignature', newSignature);

    return newSignature;
}

export const signature = getSignature();