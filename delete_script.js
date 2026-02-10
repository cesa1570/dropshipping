const fs = require('fs');
const path = 'd:\\dropshipping\\app\\product\\[id]\\ProductDetail.tsx';
try {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        console.log('File deleted successfully');
    } else {
        console.log('File not found');
    }
} catch (e) {
    console.error('Error deleting file:', e);
}
