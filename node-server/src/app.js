const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')

const app = express()
const port = 3000

const staticRoot = path.join(__dirname, '..', '..', 'server', 'src', 'MyCompany.MyStack.MyRestApp', 'wwwroot')

app.get('/api/context', (req, res) => {
    res.json({ hello: 'World!' })
})

app.use(express.static(staticRoot, { index: false })) // TODO app.use('/static', express.static(staticRoot))

app.use(fallback('index.html', { root: staticRoot }))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
