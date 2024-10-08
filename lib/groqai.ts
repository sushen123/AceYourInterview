import Groq from "groq-sdk";

// Log the Groq API key (ensure this is secure and not exposed in production logs)
console.log(process.env.NEXT_PUBLIC_GORQ_KEY);

// Initialize the Groq SDK with the API key
const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GORQ_KEY, dangerouslyAllowBrowser: true });

// Function to handle chat interactions with Groq
export async function chatGroq(prompt) {
    const chatCompletion = await getGroqChatCompletion(prompt);
    
    // Extract the completion content returned by the LLM
    const response = chatCompletion.choices[0]?.message?.content || "";
  
    // Attempt to parse the response as JSON to get the question and type
    try {
        const parsedResponse = JSON.parse(response);
        return parsedResponse; // Return the parsed JSON which includes question and type fields
    } catch (error) {
        console.error("Failed to parse JSON response from LLM", error);
        return response; // Return the raw response in case parsing fails
    }
}

// Function to generate chat completion for the interview
export async function getGroqChatCompletion(prompt) {
    let questionCount = 0;
    const totalQuestions = 15;

    const askNextQuestion = async () => {
        questionCount++;

        if (questionCount === totalQuestions) {
            return {
                role: "system",
                content: `Thanks, [Candidate's Name]. We've reached the final question. Before we wrap up, I just want to ask one more thing…`,
            };
        }

        if (questionCount > totalQuestions) {
            return {
                role: "system",
                content: `That concludes our interview for today, [Candidate's Name]. Thank you so much for your time! It was great learning about your experiences and skills. We'll be in touch soon. Have a great day!`,
            };
        }

        const userMessage = `
            User Response: ${prompt}
       
            Generate the question in this format:
            {
                "question": "[Insert question here]",
                "type": "[situational, behavioral, technical]"
            }
            Only return the response in JSON format.
        `;

        return groq.chat.completions.create({
            messages: [
                { role: "system", content: `You are an interviewer. Please conduct the interview in your own way.` },
                { role: "user", content: userMessage },
            ],
            model: "llama-3.1-70b-versatile",
        });
    };

    return await askNextQuestion();
}
