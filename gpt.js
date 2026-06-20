async function askGPT(text){

const res = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",

// ⚠️ 第八步就在这里：替换你的 API Key
"Authorization": "Bearer sk-你的APIKEY"
},

body: JSON.stringify({
model: "gpt-4o-mini",

messages: [
{
role: "system",
content: `
你是一个战线GIS生成器，只输出JSON，不要解释。

输出格式必须是：
{
 "zones": {
   "red": [],
   "blue": []
 },
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

// ⚠️ 防止异常报错
try {
return JSON.parse(data.choices[0].message.content);
} catch(e){
console.log("解析失败：", data);
return {
zones:{red:[],blue:[]},
frontlines:[],
points:[],
analysis:"解析失败"
};
}

}
