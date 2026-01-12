import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowingList, unfollowSeller } from '../services/api';

export default function Following() {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState('');

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const result = await getFollowingList(userId, order);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [userId, order]);

  const handleUnfollow = async (sellerIdToUnfollow) => {
    try {
      await unfollowSeller(userId, sellerIdToUnfollow);
      fetchData(); // Refresh list
    } catch (err) {
      alert('Erro ao deixar de seguir: ' + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seguindo</h1>
          <p className="text-gray-500">Vendedores que você segue</p>
        </div>

        {/* Order Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Ordenar:</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">Padrão</option>
            <option value="name_asc">Nome A-Z</option>
            <option value="name_desc">Nome Z-A</option>
          </select>
        </div>
      </div>

      {/* User Info */}
      {data && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-800">
            <span className="font-semibold">{data.userName || `Usuário #${data.userId}`}</span>
            {' '}segue {data.followed?.length || 0} vendedores
          </p>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando vendedores...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : data?.followed?.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-500">Você não está seguindo nenhum vendedor</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {data.followed.map((seller) => (
            <div
              key={seller.userId}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:border-amber-300 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                {seller.userId}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {seller.userName || `Vendedor #${seller.userId}`}
                </h3>
                <p className="text-sm text-gray-500">ID: {seller.userId}</p>
              </div>
              <button
                onClick={() => handleUnfollow(seller.userId)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
              >
                Deixar de seguir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

