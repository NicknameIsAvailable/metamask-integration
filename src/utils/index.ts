export const formatAddress = (addr: string | undefined) => {
    return `${addr?.substring(0, 8)}...`;
};
