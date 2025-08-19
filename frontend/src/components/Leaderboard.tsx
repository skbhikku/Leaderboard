/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { User } from '../services/api';
import { Crown, Trophy, Medal, Star, Zap, Award } from 'lucide-react';

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const topThree = users.slice(0, 3);
  const otherUsers = users.slice(3);

  const getPodiumOrder = () => {
    if (topThree.length < 2) return topThree;
    if (topThree.length === 2) return [topThree[1], topThree[0]];
    return [topThree[1], topThree[0], topThree[2]]; // 2nd, 1st, 3rd
  };

  const getRankIcon = (rank: number) => {
    const baseClasses =
      'w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2';
    switch (rank) {
      case 1:
        return (
          <div
            className={`${baseClasses} bg-yellow-100 border-yellow-300 text-yellow-500`}
          >
            <Crown className="w-6 h-6 animate-pulse" />
          </div>
        );
      case 2:
        return (
          <div
            className={`${baseClasses} bg-slate-100 border-slate-300 text-slate-500`}
          >
            <Trophy className="w-5 h-5 animate-bounce" />
          </div>
        );
      case 3:
        return (
          <div
            className={`${baseClasses} bg-orange-100 border-orange-300 text-orange-500`}
          >
            <Medal className="w-5 h-5 animate-pulse" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-sm font-bold text-slate-700 border-2 border-slate-400">
            {rank}
          </div>
        );
    }
  };

  const getPodiumStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-300 text-slate-900 scale-110 z-20 border-4 border-yellow-300';
      case 2:
        return 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-slate-900 border-4 border-slate-300';
      case 3:
        return 'bg-gradient-to-br from-orange-200 via-orange-300 to-red-300 text-slate-900 border-4 border-orange-300';
      default:
        return 'bg-white border border-slate-300 shadow';
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return 'h-40';
      case 2:
        return 'h-32';
      case 3:
        return 'h-28';
      default:
        return 'h-20';
    }
  };

  // 🔥 BLACK GLOW EFFECTS 🔥
  const getGlowEffect = (rank: number) => {
    switch (rank) {
      case 1:
        return 'animate-pulse-black shadow-2xl';
      case 2:
        return 'animate-pulse-black shadow-xl';
      case 3:
        return 'animate-pulse-black shadow-lg';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Top 3 Podium */}
      {topThree.length > 0 && (
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-2">
              🏆 HALL OF FAME 🏆
            </h2>
            <p className="text-slate-600 text-lg">The Elite Champions</p>
          </div>

          <div className="flex items-end justify-center gap-2 lg:gap-6 mb-8 px-4">
            {getPodiumOrder().map((user, index) => {
              const originalRank = user.rank;
              return (
                <div key={user._id} className="flex flex-col items-center group">
                  {/* User Card */}
                  <div
                    className={`
                    p-4 lg:p-6 rounded-2xl transition-all duration-500 hover:scale-105 mb-8 relative overflow-hidden
                    ${getPodiumStyles(originalRank)}
                    ${getGlowEffect(originalRank)}
                    ${
                      originalRank === 1
                        ? 'min-w-[140px] lg:min-w-[220px]'
                        : 'min-w-[100px] lg:min-w-[140px]'
                    }
                    transform hover:rotate-1 group-hover:shadow-2xl
                  `}
                  >
                    {/* Sparkle Effects */}
                    {originalRank === 1 && (
                      <>
                        <Star className="absolute top-2 right-2 w-4 h-4 text-yellow-500 animate-spin" />
                        <Star className="absolute bottom-2 left-2 w-3 h-3 text-yellow-400 animate-ping" />
                        <Zap className="absolute top-2 left-2 w-4 h-4 text-yellow-500 animate-bounce" />
                      </>
                    )}

                    <div className="text-center relative z-10">
                      <div className="flex justify-center mb-3">
                        {getRankIcon(originalRank)}
                      </div>

                      {/* Avatar */}
                      <div
                        className={`
                        w-12 h-12 lg:w-16 lg:h-16 bg-slate-100 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl lg:text-3xl font-black text-slate-700 border-4
                        ${
                          originalRank === 1
                            ? 'border-yellow-300 shadow-lg'
                            : originalRank === 2
                            ? 'border-slate-300'
                            : 'border-orange-300'
                        }
                        transform transition-transform group-hover:scale-110
                      `}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <h3
                        className={`font-black mb-2 ${
                          originalRank === 1
                            ? 'text-base lg:text-xl text-slate-800'
                            : 'text-sm lg:text-base text-slate-700'
                        }`}
                      >
                        {user.name}
                      </h3>

                      <div className="flex items-center justify-center gap-1 mb-1 text-slate-800">
                        <Award className="w-4 h-4" />
                        <p
                          className={`font-black ${
                            originalRank === 1
                              ? 'text-lg lg:text-2xl'
                              : 'text-base lg:text-xl'
                          }`}
                        >
                          {user.points}
                        </p>
                      </div>
                      <p className="text-xs opacity-70 text-slate-600">POINTS</p>
                    </div>
                  </div>

                  {/* Podium Base */}
                  <div
                    className={`
                    ${getPodiumHeight(originalRank)} w-full rounded-t-2xl relative overflow-hidden
                    ${getPodiumStyles(originalRank)} 
                    flex items-center justify-center font-black text-xl lg:text-2xl
                    transform transition-all duration-300 group-hover:scale-105
                  `}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
                    <span className="relative z-10">#{originalRank}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Users List */}
      {otherUsers.length > 0 && (
        <div className="animate-fade-in-up">
          <div className="text-center mb-6">
            <h3 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              🎯 ARENA RANKINGS
            </h3>
            <p className="text-slate-600">Battle for the top positions</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {otherUsers.map((user, index) => (
              <div
                key={user._id}
                className={`
                  flex items-center justify-between p-4 lg:p-6 border-b border-slate-200 hover:bg-slate-100 transition-all duration-300 group
                  ${index === otherUsers.length - 1 ? 'border-b-0' : ''}
                  hover:scale-[1.02] hover:shadow-md
                `}
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  {/* Rank Badge */}
                  <div className="flex items-center justify-center">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-black text-lg lg:text-xl border-2 border-purple-300 transform transition-transform group-hover:scale-110">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg lg:text-xl group-hover:text-purple-600 transition-colors">
                      {user.name}
                    </h4>
                    <p className="text-slate-500 text-sm">Player #{user.rank}</p>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <p className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                      {user.points}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">POINTS</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
