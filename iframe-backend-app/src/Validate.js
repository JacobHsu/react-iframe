export const isValidAddress = (address) => {
    var pattern = new RegExp('^0x[a-fA-F0-9]{40}$')
    return address.match(pattern)
};

