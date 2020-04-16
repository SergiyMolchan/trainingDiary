const dbLogin = {
  login: 'Sergiy',
  password: 'q1w2e3r4'
}
module.exports = {
  mongoURL: `mongodb+srv://${dbLogin.login}:${dbLogin.password}@cluster0-gm5hu.azure.mongodb.net/training-diary`,
  jwt: 'secret',
  PORT: 4000
}
