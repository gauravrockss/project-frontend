const link = (path) => process.env.REACT_APP_MAIN_SITE + path;

function env(name) {
    const nodeENV = process.env.NODE_ENV.toUpperCase();

    return (
        process.env[`REACT_APP_${nodeENV}_${name}`] ||
        process.env[`REACT_APP_${name}`]
    );
}

const handleAxiosError = (e, showError) => {
    console.log(e);
    const errors = e?.response?.data?.errors;
    const status = e?.response?.status;

    if (status === 500) return showError('Something went wrong');

    if (status === 400)
        return showError(errors || `Ensure you've entered valid information.`);

    if (status === 404)
        return showError(errors || `We can't find what you are looking for.`);

    if (e?.response?.data) {
        return showError(
            errors || 'Our server encountered an error, Please try again later'
        );
    }
    showError('Something went wrong');
};

const getDomain = (url) => url.replace(/(http:\/\/|https:\/\/)/, '');

function parseKB(KB) {
    const sizes = ['KB', 'MB', 'GB', 'TB'];
    if (KB === 0) return '0 KB';
    const i = Math.floor(Math.log2(KB) / 10);
    return `${parseFloat((KB / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

function escapeDanger(content) {
    const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim;

    if (regex.test(content)) return null;
    return content;
}

const formatTimeAgo = (differenceInMilliseconds) => {
    const timeUnits = [
        { unit: 'year', value: 365 * 24 * 60 * 60 * 1000 },
        { unit: 'month', value: 30 * 24 * 60 * 60 * 1000 },
        { unit: 'week', value: 7 * 24 * 60 * 60 * 1000 },
        { unit: 'day', value: 24 * 60 * 60 * 1000 },
        { unit: 'hour', value: 60 * 60 * 1000 },
        { unit: 'minute', value: 60 * 1000 },
        { unit: 'second', value: 1000 },
    ];

    for (const { unit, value } of timeUnits) {
        const differenceInUnit = Math.floor(differenceInMilliseconds / value);

        if (differenceInUnit > 0) {
            return `${differenceInUnit} ${
                differenceInUnit === 1 ? unit : unit + 's'
            } ago`;
        }
    }

    return 'Just now';
};

export {
    link,
    env,
    handleAxiosError,
    getDomain,
    parseKB,
    parseJwt,
    escapeDanger,
    formatTimeAgo,
};
