const { execSync } = require('child_process');

try {
  execSync('npm run test', { stdio: 'inherit' });
  console.log('Tests executed');
} catch (error) {
  console.error('Error running tests:', error);
  process.exit(1);
}
