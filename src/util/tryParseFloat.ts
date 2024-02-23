export const tryParseFloat = (s: string): number | undefined => {
    try {
        const value = Number.parseFloat(s);
        if (Number.isFinite(value)) {
            return value;
        }
        return undefined;
    }
    catch (e) {
        return undefined;
    }
};
