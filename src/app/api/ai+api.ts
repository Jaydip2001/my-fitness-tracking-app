import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(""); // Replace this with actual key if .env isn't working

export async function POST(request: Request) {
  const { exerciseName } = await request.json();

  if (!exerciseName) {
    return Response.json({ error: "Exercise name is required" }, { status: 400 });
  }

  const prompt = `
You are a fitness coach.
You are given an exercise, provide clear instructions on how to perform the exercise. Include if any equipment is required.
Explain the exercise in detail and for a beginner.

The exercise name is: ${exerciseName}

Keep it short and concise. Use markdown formatting.

Use the following format:

## Equipment Required

## Instructions

### Tips

### Variations

### Safety

Keep spacing between the headings and the content.

Always use headings and subheadings.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // 🔥 Use gemini-1.5-pro

    const result = await model.generateContent([prompt]); // 👈 wrapped in array
    const response = await result.response;
    const text = await response.text();

    return Response.json({ message: text });
  } catch (error) {
    console.error("Error fetching AI guidance:", error);
    return Response.json(
      { error: "Error fetching AI guidance" },
      { status: 500 }
    );
  }
}
