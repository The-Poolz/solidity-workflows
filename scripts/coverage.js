const { execSync } = require('child_process');

try {
  execSync('npm run coverage', { stdio: 'inherit' });
  console.log('Coverage executed');
} catch (error) {
  console.error('Error running coverage:', error);
  process.exit(1);
}
