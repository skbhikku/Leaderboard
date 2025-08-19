import React, { useState } from 'react';
import { User } from '../services/api';
import { UserPlus, Zap, Users, Gamepad2, Plus, X } from 'lucide-react';

interface UserSelectorProps {
  users: User[];
  selectedUserId: string;
  onUserSelect: (userId: string) => void;
  onClaimPoints: (userId: string) => void;
  onAddUser: (name: string) => void;
  isLoading: boolean;
}

const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUserId,
  onUserSelect,
  onClaimPoints,
  onAddUser,
  isLoading
}) => {
  const [newUserName, setNewUserName] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName('');
      setShowAddUser(false);
    }
  };

  const selectedUser = users.find(user => user._id === selectedUserId);

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 lg:p-8 border border-purple-500/30 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            PLAYER ACTIONS
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Selection Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-purple-400" />
              <label htmlFor="user-select" className="text-lg font-bold text-white">
                Select Player
              </label>
            </div>
            
            <div className="relative">
              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => onUserSelect(e.target.value)}
                className="w-full p-4 bg-slate-700/80 backdrop-blur-sm border-2 border-slate-600 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 text-white font-semibold transition-all duration-300 appearance-none cursor-pointer hover:bg-slate-700"
                disabled={isLoading}
              >
                <option value="" className="bg-slate-800">🎮 Choose your player...</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id} className="bg-slate-800">
                    #{user.rank} - {user.name} ({user.points} pts)
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Claim Points Button */}
            {selectedUserId && (
              <button
                onClick={() => onClaimPoints(selectedUserId)}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95"
              >
                <div className="relative">
                  <Zap className="w-6 h-6" />
                  {isLoading && (
                    <div className="absolute inset-0 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                {isLoading ? 'CLAIMING...' : `⚡ CLAIM POINTS FOR ${selectedUser?.name?.toUpperCase()}`}
              </button>
            )}
          </div>

          {/* Add New User Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <UserPlus className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">Add New Player</h3>
            </div>
            
            {!showAddUser ? (
              <button
                onClick={() => setShowAddUser(true)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:shadow-green-500/50 transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-6 h-6" />
                JOIN THE ARENA
              </button>
            ) : (
              <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600">
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="Enter player name..."
                      className="w-full p-4 bg-slate-800/80 border-2 border-slate-600 rounded-xl focus:ring-4 focus:ring-green-500/50 focus:border-green-500 text-white font-semibold placeholder-slate-400 transition-all duration-300"
                      required
                      disabled={isLoading}
                      maxLength={50}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isLoading || !newUserName.trim()}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
                    >
                      <UserPlus className="w-5 h-5" />
                      ADD PLAYER
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddUser(false);
                        setNewUserName('');
                      }}
                      className="px-4 py-3 text-slate-300 border-2 border-slate-600 rounded-xl hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-300 font-bold flex items-center justify-center transform hover:scale-105 active:scale-95"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Stats Display */}
        {users.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-purple-400">{users.length}</p>
                <p className="text-sm text-slate-300 font-semibold">TOTAL PLAYERS</p>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-yellow-400">{users[0]?.points || 0}</p>
                <p className="text-sm text-slate-300 font-semibold">TOP SCORE</p>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-green-400">
                  {Math.round(users.reduce((sum, user) => sum + user.points, 0) / users.length) || 0}
                </p>
                <p className="text-sm text-slate-300 font-semibold">AVG SCORE</p>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-pink-400">
                  {users.reduce((sum, user) => sum + user.points, 0)}
                </p>
                <p className="text-sm text-slate-300 font-semibold">TOTAL POINTS</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelector;