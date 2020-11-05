export const weekdayName = (date, lang) => {
    const ms = date * 1000;
    return new Date(ms).toLocaleString(lang, {weekday: 'long'});
};