// src/app/api/process-pdf/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const apiKey = formData.get('apiKey') as string;
    const assistantId = formData.get('assistantId') as string;

    if (!file || !apiKey || !assistantId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });

    // Upload the file to OpenAI
    const fileUpload = await openai.files.create({
      file: file,
      purpose: 'assistants',
    });

    // Add the file to the assistant
    await openai.beta.assistants.files.create(
      assistantId,
      { file_id: fileUpload.id }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Error processing PDF' },
      { status: 500 }
    );
  }
}