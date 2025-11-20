import { NextResponse } from 'next/server';
import { generateJWTToken } from '@/lib/jwt';

const API_BASE_URL = 'https://sent-api.dev.sentient.xyz/rpc';

function getAPIHeaders() {
  return {
    'x-custom-auth': 'd9ab6590f8a7b4e6d0c67db00b5f7e5cbfd3179fbbfdd3432a44d604fa10b7a3',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${generateJWTToken()}`,
  };
}

export async function POST() {
  try {
    const response = await fetch(`${API_BASE_URL}/get_transactions`, {
      method: 'POST',
      headers: getAPIHeaders(),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
