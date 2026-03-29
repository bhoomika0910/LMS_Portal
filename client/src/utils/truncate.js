export const truncate = (value, length = 120) => {
    if (value.length <= length)
        return value;
    return `${value.slice(0, length)}…`;
};
