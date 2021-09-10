const fs = require("fs")
const path = require("path")
const express = require("express")

const PORT = 3010
const app = express()

app.listen(PORT, () => {
    console.log(`--- server running on ${PORT} ---`)
})

function forceParseInt(any) {
    let v = 0
    try {
        v = parseInt(any, 10)
        if (isNaN(v)) {
            v = 0
        }
    } catch (error) {
        v = 0
    }
    return v
}

app.get("/*", (req, res) => {
    let id = req.url.substring(1)
    let fullPath = path.join(__dirname, "ids", id)
    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, "0")
    }
    let current = fs.readFileSync(fullPath).toString()
    let parsed = (forceParseInt(current) + 1).toString()
    if (parsed !== current) {
        fs.writeFileSync(fullPath, parsed)
    }
    res.status(200).send(parsed)
})

app.get("*", (req, res) => {
    res.status(200).send("-1")
})
