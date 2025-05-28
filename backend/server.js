const path = require('path');
const dotenv = require('dotenv');

// Load .env file with explicit path
const result = dotenv.config({ path: path.join(__dirname, '.env') });

if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}

// console.log('Environment loaded from:', path.join(__dirname, '.env'));
// console.log('GOOGLE_API_KEY exists:', !!process.env.GOOGLE_API_KEY);

const app = require('./src/app');

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
// This is the entry point for the backend server.
