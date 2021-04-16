const http = require('http');
const fs = require('fs');

http
    .get("http://jsonplaceholder.typicode.com/posts", res => {
        let data = []

        res.on("data", raw => {
            data.push(raw)
        })

        res.on("end", () => {
            const posts = Buffer.concat(data).toString()
            let dir = "./result"
            
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
                fs.writeFile(dir + "/posts.json", posts, err => {
                    err ? console.log(err) : null
                })
            }
        })

    })
    .on("error", err => console.log(err.message));