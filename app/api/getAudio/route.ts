// app/api/getAudio/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  try {
    const url = 'https://api.deepgram.com/v1/speak?model=aura-helios-en';
    const options = { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY}`
      }, 
      body: JSON.stringify({ text })
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error fetching audio: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'audio/wav'
      }
    });
  } catch (error) {
    console.error('Error fetching audio:', error);
    return new NextResponse('Error fetching audio', { status: 500 });
  }
}
