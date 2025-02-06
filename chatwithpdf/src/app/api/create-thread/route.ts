// src/app/api/create-thread/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { apiKey, assistantId } = await req.json();
    
    const openai = new OpenAI({ apiKey });
    
    // Create a new thread
    const thread = await openai.beta.threads.create();

    return NextResponse.json({ threadId: thread.id });
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json(
      { error: 'Error creating thread' },
      { status: 500 }
    );
  }
}