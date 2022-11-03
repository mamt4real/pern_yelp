const fs = require('fs')

module.exports = () => {
  const data = fs.readFileSync('./.env', 'utf-8')
  const lines = data.split('\n')
  for (const line of lines) {
    const [key, value] = line.split('=')
    if (key && value) process.env[key.trim()] = value.trim()
  }
}
