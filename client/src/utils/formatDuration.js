export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (!hours)
        return `${mins}m`;
    return `${hours}h ${mins}m`;
};
