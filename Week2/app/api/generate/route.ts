import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
  });  

export async function POST(req: Request) {
    const {topic, tone, type, temperature} = await req.json();
    
    const res = await openai.chat.completions.create({
        messages: [{
            role: 'user',
            content: `${tone} ${type} joke about ${topic}`,
        }],
        temperature,
        max_tokens: 500,
    });

    return new Response(JSON.stringify({joke: res.choices[0].message.content}));
}