/* eslint-disable @next/next/no-html-link-for-pages */
import { dbConnection } from '@/app/lib/db';
import fixtureModel from '@/app/lib/models/fixture.model';
import { FixtureType } from '@/app/types/fixtureType';
import { dataConvert } from '@/app/utils/dateConverter';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function FixtureDetailPage({ params: { id } }: Props) {
  await dbConnection();

  const fixture = (await fixtureModel.findById(id)) as FixtureType | null;
  if (!fixture) return notFound();

  return (
    <div className='max-w-xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        {fixture.home_team} vs {fixture.away_team}
      </h1>

      <div className='space-y-2 text-gray-700'>
        <p>
          <strong>Competition:</strong> {fixture.competition_name}
        </p>
        <p>
          <strong>Season:</strong> {fixture.season}
        </p>
        <p>
          <strong>Round:</strong> {fixture.fixture_round}
        </p>
        <p>
          <strong>Date:</strong> {dataConvert(fixture.fixture_datetime)}
        </p>
        <p>
          <strong>Fixture ID:</strong> {fixture.fixture_mid}
        </p>
      </div>

      <div className='mt-6'>
        <a href='/fixtures' className='text-blue-500 hover:underline'>
          Back to Search
        </a>
      </div>
      <div className='mt-6'>
        <a href='/fixtures/uploadCsv' className='text-blue-500 hover:underline'>
          Back to Upload CSV
        </a>
      </div>
    </div>
  );
}
