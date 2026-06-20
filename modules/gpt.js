async function askGPT(text){

const res = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer 你的API_KEY"
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: `
你是战线GIS生成器，只输出JSON，不要解释。

格式：
{
 "zones": { "red": [], "blue": [] },
 "frontlines": [],
 "points": [],
 "analysis": ""
}
`
},
{
role: "user",
content: text
}
]
})
});

let data = await res.json();

return JSON.parse(data.choices[0].message.content);

}
