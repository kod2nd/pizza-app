const exportModules = require('./app')
const app = exportModules.app
const PORT = exportModules.PORT


app.listen(PORT, () => {
    console.log("Server has started")})