export default function PostCard({ post, showPromo = false }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };


  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.user_id}
            </div>
            <div>
              <p className="text-sm text-gray-500">Vendedor #{post.user_id}</p>
              <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            {`Categoria ${post.category}`}
          </span>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {post.product.product_name}
          </h3>

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
              {post.product.type}
            </span>
            <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md">
              {post.product.brand}
            </span>
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md">
              {post.product.color}
            </span>
          </div>

          {post.product.notes && (
            <p className="text-sm text-gray-600 italic">
              "{post.product.notes}"
            </p>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              {showPromo && post.has_promo && post.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(post.price * (1 - post.discount / 100))}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(post.price)}
                  </span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">
                    -{post.discount}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-amber-600">
                  {formatPrice(post.price)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400">
              ID: {post.product.product_id}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

