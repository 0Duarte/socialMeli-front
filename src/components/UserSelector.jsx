import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function UserSelector() {
  const { activeUserId, setActiveUserId } = useUser();
  const [inputValue, setInputValue] = useState(activeUserId.toString());
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserId = parseInt(inputValue, 10);
    if (!isNaN(newUserId) && newUserId > 0) {
      setActiveUserId(newUserId);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <label htmlFor="userId" className="text-sm text-gray-500 hidden sm:block">
        Usuário:
      </label>
      <div className="flex items-center">
        <input
          type="number"
          id="userId"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          min="1"
          className="w-16 px-3 py-1.5 text-center border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          placeholder="ID"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-amber-500 text-white rounded-r-lg hover:bg-amber-600 transition-colors font-medium"
        >
          OK
        </button>
      </div>
    </form>
  );
}

