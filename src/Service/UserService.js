import browserSignature from 'browser-signature';
import Cookies from 'js-cookie'

const getSignature = () => {
    const signature = Cookies.get('signature');

    if (signature) {
        return signature;
    }

    const newSignature = browserSignature();
    Cookies.set('signature', newSignature, { expires: 365 });

    return newSignature;
}

export const signature = getSignature();