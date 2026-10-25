const OpenAI = require("openai");
 
const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",

});
 
const VISION_PROMPT = `You are a fashion analysis assistant.
Analyze the outfit shown in the image. The designer's caption  is: "{caption}"
 
Based PRIMARILY on the image itself (use the caption only as secondary context),
return ONLY a valid JSON object with these exact keys, no extra text:
 
{
  "colors": "dominant color(s), short phrase",
  "fabricType": "best guess at fabric, e.g. silk, cotton, denim, linen",
  "silhouette": "garment shape, e.g. A-line, bodycon, straight-cut, flared",
  "workType": "embellishment/technique, e.g. embroidery, print, plain, sequins"
}`;

async function generateAiTags(imageBuffer, mimeType, caption)  {
    try {
        const imageDataUri = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;

        const response = await openai.chat.completions.create({
            model: "gemini-3.6-flash",
            messages: [
                {
                    role: "user",
                    content: [                
                                             // it means see in vision_prompt and replace the {caption} to caption(if exists) otherwise to "" means empty string || means OR
                        { type: "text", text: VISION_PROMPT.replace("{caption}", caption || "") },
                        { type: "image_url", image_url: { url: imageDataUri } },
                    ],
                },
            ],
        });
 
        let raw = response.choices[0].message.content.trim();
        if (raw.startsWith("```")) {
            // actually ai send data in raw format so in raw replaces the \```json (starting) OR ```\(ending)g(g is flag means keep matching not stop just after  matching the starting ```json) to "" and then trim means remove any unwanted spacing etc .
            raw = raw.replace(/```json|```/g, "").trim();
        }
 //  now json.parse means now actually json (raw is cleanup before)  is converted into real  javascript object so that now aiTags.colours you can write etc.
        return JSON.parse(raw);
        
    } catch (err) {
        console.error("AI tagging failed:", err.message);
        // if AI tagging fails then return empty tags 
        return { colors: null, fabricType: null, silhouette: null, workType: null };
    }
}
 
module.exports = { generateAiTags };
 

 
