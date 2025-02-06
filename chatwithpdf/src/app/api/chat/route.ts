// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { message, threadId, apiKey, assistantId } = await req.json();
    
    if (!message || !threadId || !apiKey || !assistantId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    // Wait for the assistant to complete processing
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      
      if (runStatus.status === 'failed') {
        throw new Error('Assistant run failed');
      }
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(threadId);
    const lastMessage = messages.data[0];

    return NextResponse.json({
      message: lastMessage.content[0].text.value,
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Error processing chat' },
      { status: 500 }
    );
  }
}