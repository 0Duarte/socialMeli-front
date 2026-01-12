import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getFollowersCount } from '../services/api';

export default function Home() {
  const { activeUserId } = useUser();
  const [followersData, setFollowersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null); 
      try {
        const data = await getFollowersCount(activeUserId);
        setFollowersData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [activeUserId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vindo ao SocialMeli!
        </h1>
        <p className="text-amber-100 text-lg">
          A rede social dos vendedores e compradores do Mercado Livre
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            {activeUserId}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Usuário Ativo: #{activeUserId}
            </h2>
            {loading ? (
              <p className="text-gray-500">Carregando...</p>
            ) : error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : followersData ? (
              <p className="text-gray-600">
                {followersData.userName || `Usuário ${activeUserId}`} • {followersData.followersCount} seguidores
              </p>
            ) : null}
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Use o seletor de usuário no menu para trocar de conta. Todas as páginas serão atualizadas com os dados do novo usuário.
        </p>
      </div>

      {/* Quick Actions */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to={`/users/${activeUserId}/feed`}
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Ver Feed</h4>
              <p className="text-sm text-gray-500">Publicações de quem você segue</p>
            </div>
          </div>
        </Link>

        <Link
          to={`/users/${activeUserId}/followers`}
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Meus Seguidores</h4>
              <p className="text-sm text-gray-500">Quem está seguindo você</p>
            </div>
          </div>
        </Link>

        <Link
          to={`/users/${activeUserId}/followed`}
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Seguindo</h4>
              <p className="text-sm text-gray-500">Vendedores que você segue</p>
            </div>
          </div>
        </Link>

        <Link
          to="/publish"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Nova Publicação</h4>
              <p className="text-sm text-gray-500">Publicar um novo produto</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

