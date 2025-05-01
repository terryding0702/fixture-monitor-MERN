import { dbConnection } from '@/app/lib/db';
import fixtureModel from '@/app/lib/models/fixture.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET({ nextUrl }: NextRequest) {
  const query = nextUrl.searchParams.get('teamName') || '';

  console.log('!!@', query);

  await dbConnection();

  const results = await fixtureModel.find({
    $or: [
      { home_team: { $regex: query, $options: 'i' } },
      { away_team: { $regex: query, $options: 'i' } },
    ],
  });

  return NextResponse.json(results);
}
