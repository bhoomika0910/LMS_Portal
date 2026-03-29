export const getRatingColor = (rating) => {
    if (rating >= 4.5)
        return 'text-emerald-300';
    if (rating >= 4)
        return 'text-lime-300';
    if (rating >= 3)
        return 'text-amber-300';
    return 'text-red-300';
};
