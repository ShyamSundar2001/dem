import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://sent-api.dev.sentient.xyz/rpc';
const API_HEADERS = {
  'x-custom-auth': 'd9ab6590f8a7b4e6d0c67db00b5f7e5cbfd3179fbbfdd3432a44d604fa10b7a3',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHNlbnRpZW50LmludGVybmFsIiwidXNlciI6InRlc3RAc2VudGllbnQuaW50ZXJuYWwiLCJyb2xlIjoic2VudGFwcCIsImV4cCI6MTc2MzYzNTg2OH0.OxZ6A97W3aksuyn7PDUXnoj5bVYzzcwKFQs4vMn_oyc',
};

export async function POST() {
  try {
    const response = await fetch(`${API_BASE_URL}/get_portfolio`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
