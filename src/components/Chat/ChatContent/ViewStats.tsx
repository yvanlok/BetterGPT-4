import React, { useState, useEffect } from 'react';
import PopupModal from '@components/PopupModal';
import { supabase } from '@utils/supabaseClient';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface Stats {
  totalRequests: number;
  topModel: string;
  topModelRequests: number;
  lastRequestContent: string;
  lastRequestDate: string;
  modelDistribution: {
    [model: string]: number;
  };
}

const ViewStats = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [email, setEmail] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setEmail(session?.user?.email ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_OPENAI_BASE_URL}/v1/stats/${email}`)
        .then((response) => response.json())
        .then((data) => {
          setStats(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('An error occured fetching user stats:', error);
          setIsLoading(false);
        });
    }
  }, [isModalOpen]);

  return (
    <>
      <button
        className='btn btn-neutral'
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        View Stats
      </button>
      {isModalOpen && (
        <PopupModal
          setIsModalOpen={setIsModalOpen}
          title='View Stats'
          cancelButton={false}
        >
          {isLoading ? (
            <div className='p-6 border-b text-center border-gray-200 dark:border-gray-600 gap-4 text-gray-100'>
              Loading...
            </div>
          ) : (
            <div className='p-6 border-b border-gray-200 dark:border-gray-600 gap-4 text-gray-100'>
              <strong>Total Requests:</strong> {stats?.totalRequests}
              <br></br>
              <strong>Top Model:</strong> {stats?.topModel}
              <br></br>
              <strong>Top Model Requests:</strong> {stats?.topModelRequests}
              <br></br>
              <strong>Last Request Prompt:</strong> {stats?.lastRequestContent}
              <br></br>
              <strong>Last Request:</strong>{' '}
              {stats && formatDistanceToNow(parseISO(stats.lastRequestDate))}{' '}
              ago
              <br></br>
            </div>
          )}
        </PopupModal>
      )}
    </>
  );
});

export default ViewStats;
