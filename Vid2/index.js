require('dotenv').config();

const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

let github = {
    "login": "Pritamawatade",
    "id": 117350475,
    "node_id": "U_kgDOBv6gSw",
    "avatar_url": "https://avatars.githubusercontent.com/u/117350475?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Pritamawatade",
    "html_url": "https://github.com/Pritamawatade",
    "followers_url": "https://api.github.com/users/Pritamawatade/followers",
    "following_url": "https://api.github.com/users/Pritamawatade/following{/other_user}",
    "gists_url": "https://api.github.com/users/Pritamawatade/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Pritamawatade/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Pritamawatade/subscriptions",
    "organizations_url": "https://api.github.com/users/Pritamawatade/orgs",
    "repos_url": "https://api.github.com/users/Pritamawatade/repos",
    "events_url": "https://api.github.com/users/Pritamawatade/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Pritamawatade/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Pritam",
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": true,
    "bio": "Journey to learn something new",
    "twitter_username": "pritam_awatade",
    "public_repos": 14,
    "public_gists": 0,
    "followers": 3,
    "following": 0,
    "created_at": "2022-11-03T09:24:00Z",
    "updated_at": "2024-07-21T06:20:57Z"
   
}
app.get('/github', (req, res) => {
    res.json(github)
})

app.get('/twitter', (req, res) => {
    res.send('Pritam_awatade')
})

app.get('/login',(req, res)=>{
    res.send('<h1>Welcome!</h1>')
})
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`);
})





