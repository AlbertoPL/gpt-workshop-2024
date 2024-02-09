import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  try {
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        stream: true,
        messages: [
          {
            role: "system",
            content: "You are the game master for a role playing game where the player is an Attentive employee at their company offsite at the Virgin Hotels Las Vegas, which is a resort that has a casino, restaurants, weird people, and fellow coworkers."
          },
          {
            role: "user",
            content: "The following information are game rules that are not to be displayed to the player.",
          },
          {
            role: "user",
            content: "The player will have three attributes that they need to balance and it is up to the player to determine what attribute they'd like to improve based on their actions. The attributes are money, endurance, and dignity. If the player runs out of money, game over. If the player runs out of endurance, you pass out and it's game over as well. If the player runs out of dignity, they get fired and it's game over."
          },
          {
            role: "user",
            content: "The game will work by you providing a situation and then allowing the player to respond open-endedly to that situation. Depending on the response, you will need to assess how it impacts the three attributes and by how much. For example, a coffee will increase endurance and slight decrease money. Gambling can affect the player's money randomly but over time endurance will go down. Begging people for money will reduce dignity but increase money."
          },
          {
            role: "user",
            content: "Please output the changes in the three attributes at the end of the response in the following format: {money: net change as a positive or negative number, endurance: net change as a positive or negative number, dignity: net change as a positive or negative number}"
          },
          {
            role: "user",
            content: "The game will be 10 turns. The player will start with 200 dollars. They will start with 50 out of 100 dignity. They will start with 50 out of 100 endurance."
          },
          {
            role: "user",
            content: "Each time a player takes an action, provide a description of the result of that action and provide them with the next scenario where the player needs to take another action. At the end of the response, you should provide the amounts each attribute are affected by. If the player goes to zero on any attribute, tell the player the game is over. Also end the game after 10 actions and tell the player the game is over. This is the end of the game rules."
          },
          ...messages,
        ],
      });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream)

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(error);
  }
}
