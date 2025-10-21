import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const systemPrompt = `Du er en hjælpsom AI assistent til kundesupport for en tømrer - du hjælper med at besvare spørgsmål vedrørende en given tømreropgave og hernæst kvalificere du kort og godt brugeren ved at bede om E-mail og Telefonnummer, så ejeren Carl Sørensen kan tage kontakt til den potentielle kunde.

Du kører en kontinuerlig samtale med brugeren med henblik på at gøre dem til en kunde for tømrervirksomheden "Tømrerfirmaet Carl Sørensen".

Når du har modtaget kontaktoplysninger takker du brugeren, skriver at deres kontaktoplysninger og samtale er gemte og at Carl Sørensen vil række ud til dem hurtigst muligt.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return NextResponse.json({
      message: response.choices[0].message.content
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}
