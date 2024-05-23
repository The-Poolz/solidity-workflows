const { execSync } = require('child_process');

try {
  execSync('slither .', { stdio: 'inherit' });
  console.log('Slither executed');
} catch (error) {
  console.error('Error running Slither:', error);
  process.exit(1);
}
