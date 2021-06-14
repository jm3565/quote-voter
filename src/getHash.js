const crypto = require('crypto');

const getHash = (str) => {
    return crypto.createHash('sha1').update(str).digest('hex');
} 

export default getHash;
