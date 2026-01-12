import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowersList } from '../services/api';

export default function Followers() {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState('');

  const isSeller = data?.isSeller ?? true;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const result = await getFollowersList(userId, order);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId, order]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Seguidores</h1>
          <p className="text-gray-500">Usuários que seguem você</p>
        </div>

        {/* Order Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Ordenar:</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            disabled={!isSeller}
            className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${!isSeller ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <option value="">Padrão</option>
            <option value="name_asc">Nome A-Z</option>
            <option value="name_desc">Nome Z-A</option>
          </select>
        </div>
      </div>

      {/* User Info */}
      {data && isSeller && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-amber-800">
            <span className="font-semibold">{data.userName || `Usuário #${data.userId}`}</span>
            {' '}tem {data.followers?.length || 0} seguidores
          </p>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando seguidores...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : !isSeller ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <p className="text-gray-500">Apenas vendedores podem ter seguidores</p>
        </div>
      ) : data?.followers?.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-500">Nenhum seguidor encontrado</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {data.followers.map((follower) => (
            <div
              key={follower.userId}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:border-amber-300 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {follower.userId}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {follower.userName || `Usuário #${follower.userId}`}
                </h3>
                <p className="text-sm text-gray-500">ID: {follower.userId}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

