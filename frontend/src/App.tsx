/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, claimPoints, User } from './services/api';
import Leaderboard from './components/Leaderboard';
import UserSelector from './components/UserSelector';
import Toast from './components/Toast';
import { Trophy, Gamepad2, Sparkles } from 'lucide-react';
import './index.css'
interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const fetchUsers = useCallback(async () => {
    try {
      const userData = await getUsers();
      setUsers(userData);
      setIsInitialLoad(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast('Failed to load users. Please check if the backend is running.', 'error');
      setIsInitialLoad(false);
    }
  }, []);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleClaimPoints = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await claimPoints(userId);
      setUsers(response.leaderboard);
      const user = response.user;
      showToast(
        `🎉 ${user.name} earned ${response.pointsAwarded} points! Total: ${user.points} points`,
        'success'
      );
    } catch (error) {
      console.error('Error claiming points:', error);
      showToast('Failed to claim points. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (name: string) => {
    try {
      setIsLoading(true);
      await createUser(name);
      await fetchUsers();
      showToast(`🎮 Welcome ${name}! Ready to compete!`, 'success');
    } catch (error: any) {
      console.error('Error adding user:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add user. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isInitialLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <Sparkles className="w-6 h-6 text-purple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Leaderboard</h2>
          <p className="text-purple-600">Preparing the arena...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in">
            <div className="relative">
              <Trophy className="w-10 h-10 lg:w-12 lg:h-12 text-yellow-500 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 animate-gradient-x">
              LEADERBOARD
            </h1>
            <div className="relative">
              <Gamepad2 className="w-10 h-10 lg:w-12 lg:h-12 text-purple-500 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
            </div>
          </div>
          <p className="text-purple-600 text-lg lg:text-xl font-medium animate-fade-in-up">
            🎮 Compete • Earn Points • Dominate the Arena! 🏆
          </p>
        </div>

        {/* User Controls */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-12 animate-slide-up">
          <UserSelector
            users={users}
            selectedUserId={selectedUserId}
            onUserSelect={handleUserSelect}
            onClaimPoints={handleClaimPoints}
            onAddUser={handleAddUser}
            isLoading={isLoading}
          />
        </div>

        {/* Leaderboard */}
        <div className="animate-slide-up animation-delay-300">
          <Leaderboard users={users} />
        </div>

        {/* Loading State */}
        {users.length === 0 && !isInitialLoad && (
          <div className="text-center py-12 animate-fade-in">
            <div className="bg-gray-50 rounded-2xl p-8 border border-purple-300/30">
              <Gamepad2 className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-bounce" />
              <p className="text-gray-800 text-xl font-semibold mb-2">
                Arena is Empty
              </p>
              <p className="text-gray-600">
                Make sure the backend server is running on port 5000.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Toast Messages */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
