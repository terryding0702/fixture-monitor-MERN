'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FixtureType } from '@/app/types/fixtureType';
import useDebounceValue from '@/app/hooks/useDebounceValue';
import { dataConvert } from '@/app/utils/dateConverter';
import Spinner from '@/app/components/Spinner';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FixtureType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedQuery = useDebounceValue(query);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (!debouncedQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/search?teamName=${debouncedQuery}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className='max-w-xl mx-auto p-6'>
      {loading && <Spinner />}
      <h1 className='text-2xl font-semibold text-center text-gray-800 mb-2'>
        Search the CSV File By Team Name
      </h1>
      <input
        type='text'
        placeholder='Search team name...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full p-3 border border-gray-300 rounded mb-4 my-4'
      />

      {results.length === 0 && query && (
        <p className='text-gray-500'>No results found.</p>
      )}

      {results.map((fixture) => (
        <Link
          key={fixture._id}
          href={`/fixtures/${fixture._id}`}
          className='block p-4 border rounded mb-2 shadow hover:bg-gray-100'
        >
          <div>
            <p>
              Home Team: <strong>{fixture.home_team}</strong>
            </p>
            <p>
              Away Team: <strong>{fixture.away_team}</strong>
            </p>
          </div>
          <div className='text-sm text-gray-500'>
            {fixture.competition_name}
          </div>
          <div className='text-sm text-gray-500'>
            {dataConvert(fixture.fixture_datetime)}
          </div>
        </Link>
      ))}
    </div>
  );
}
