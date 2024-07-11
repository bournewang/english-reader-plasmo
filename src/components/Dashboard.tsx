// import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { getStats } from '../api/stats'; // You need to implement this API call
import type { Stats } from '../api/types';

const Grid: React.FC<{label: string, data: number | null, delta: number | null}> = ({ label, data, delta }) => {
  return (
    <div className="p-5 bg-white rounded shadow-sm">
      <div className="text-base text-gray-400 ">{label}</div>

      <div className="flex items-center pt-5">
        <div className="text-2xl font-bold text-gray-900 ">{data}</div>
        {delta &&
        <span className={`ml-4 flex items-center px-2 py-0.5 mx-2 text-sm rounded-full ${delta > 0 ? 'text-green-600 bg-green-100 ' : 'text-red-600 bg-red-100 '}`}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={`${delta > 0 ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>{delta > 0 ? delta : delta * -1}%</span>
        </span>
}
      </div>
    </div>
  );
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats|null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try{
      const response = await getStats()
      // .then(response => {
      console.log("response: ", response)
      if (response.success) {
        console.log(response.data);
        setStats(response.data);
      }
    }catch(e){
      console.log("error: ", e)
    }
      // })
    };

    fetchStats();
  }, []);

  return (
    <div className="flex items-center max-h-screen min-w-screen bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-6xl px-5 mx-auto my-28">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <Grid label="Word Count / Today" data={stats && stats.today_word_count} delta={stats && stats.today_word_count_change} />
          <Grid label="Word Count / Week" data={stats && stats.week_word_count} delta={stats && stats.week_word_count_change} />
          <Grid label="Word Count / Month" data={stats && stats.month_word_count} delta={stats && stats.month_word_count_change} />
          <Grid label="Word Count / Total" data={stats && stats.total_word_count} delta={stats && stats.total_word_count_change} />

          <Grid label="Unfamiliar Words / Today" data={stats && stats.today_words} delta={stats && stats.today_words_change} />
          <Grid label="Unfamiliar Words / Week" data={stats && stats.week_words} delta={stats && stats.week_words_change} />
          <Grid label="Unfamiliar Words / Month" data={stats && stats.month_words} delta={stats && stats.month_words_change} />
          <Grid label="Unfamiliar Words / Total" data={stats && stats.total_words} delta={stats && stats.total_words_change} />

          <Grid label="Articles Read / Today" data={stats && stats.today_articles} delta={stats && stats.today_articles_change} />
          <Grid label="Articles Read / Week" data={stats && stats.week_articles} delta={stats && stats.week_articles_change} />
          <Grid label="Articles Read / Month" data={stats && stats.month_articles} delta={stats && stats.month_articles_change} />
          <Grid label="Articles Read / Total" data={stats && stats.total_articles} delta={stats && stats.total_articles_change} />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
