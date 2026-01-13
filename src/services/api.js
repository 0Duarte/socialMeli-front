const BASE_URL = 'http://localhost:8080';

// ============ FOLLOW ENDPOINTS ============

// [US0001] Follow seller
export async function followSeller(userId, userIdToFollow) {
  const response = await fetch(`${BASE_URL}/users/${userId}/follow/${userIdToFollow}`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Erro ao seguir vendedor');
  return response;
}

// [US0007] Unfollow seller
export async function unfollowSeller(userId, userIdToUnfollow) {
  const response = await fetch(`${BASE_URL}/users/${userId}/unfollow/${userIdToUnfollow}`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Erro ao deixar de seguir vendedor');
  return response;
}

// [US0002] Get followers count
export async function getFollowersCount(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}/followers/count`);
  if (!response.ok) throw new Error('Erro ao buscar contagem de seguidores');
  return response.json();
}

// [US0003] Get followers list (Who follow me?)
export async function getFollowersList(userId, order = '') {
  const url = order 
    ? `${BASE_URL}/users/${userId}/followers/list?order=${order}`
    : `${BASE_URL}/users/${userId}/followers/list`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar seguidores');
  return response.json();
}

// [US0004] Get following list (Who am I following?)
export async function getFollowingList(userId, order = '') {
  const url = order 
    ? `${BASE_URL}/users/${userId}/followed/list?order=${order}`
    : `${BASE_URL}/users/${userId}/followed/list`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar vendedores seguidos');
  return response.json();
}

// ============ POST ENDPOINTS ============

// [US0005] Create a new post
export async function createPost(postData) {
  const response = await fetch(`${BASE_URL}/products/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Erro ao criar publicação');
  }
  return response;
}

// [US0006] Get posts from followed users (Feed)
export async function getFollowedPosts(userId, order = '') {
  const url = order 
    ? `${BASE_URL}/products/followed/${userId}/list?order=${order}`
    : `${BASE_URL}/products/followed/${userId}/list`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar feed');
  return response.json();
}

// [US0010] Create a new promotional post
export async function createPromoPost(postData) {
  const response = await fetch(`${BASE_URL}/products/promo-pub`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error('Erro ao criar publicação promocional');
  return response;
}

// [US0011] Get promo products count
export async function getPromoProductsCount(userId) {
  const response = await fetch(`${BASE_URL}/products/promo-pub/count?user_id=${userId}`);
  if (!response.ok) throw new Error('Erro ao buscar contagem de promoções');
  return response.json();
}
