export const generateStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;
        if (value <= rating)
            return 'full';
        if (value - rating < 1)
            return 'half';
        return 'empty';
    });
};
