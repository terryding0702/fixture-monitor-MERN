/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnection } from '@/app/lib/db';
import fixtureModel from '@/app/lib/models/fixture.model';
import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ message: 'No file' }, { status: 400 });

  const text = await file.text();
  const parsed = Papa.parse(text, { header: true });

  const cleaned = parsed.data.map(
    ({
      fixture_mid,
      season,
      competition_name,
      fixture_datetime,
      fixture_round,
      home_team,
      away_team,
    }: any) => ({
      fixture_mid: fixture_mid,
      season: +season,
      competition_name,
      fixture_datetime: new Date(fixture_datetime),
      fixture_round: +fixture_round,
      home_team,
      away_team,
    })
  );

  await dbConnection();
  await fixtureModel.insertMany(cleaned, { ordered: false }).catch(() => {});

  return NextResponse.json({ message: 'Upload complete!' });
};
