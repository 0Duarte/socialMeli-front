# SocialMeli - Frontend

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Frontend em React para a aplicação SocialMeli, uma rede social para vendedores do Mercado Livre.

## Tecnologias

- React 19
- Vite
- Tailwind CSS
- React Router DOM

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend rodando em `http://localhost:8080`


### Instalação

```bash
# Clonar o repositório
git clone https://github.com/0Duarte/socialMeli-front
cd socialmeli-front

# Instalar dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`


## Endpoints Utilizados

O frontend consome a API backend rodando em `http://localhost:8080`.

### Follow Endpoints

| Método | Endpoint | Descrição | User Story |
|--------|----------|-----------|------------|
| `POST` | `/users/{userId}/follow/{userIdToFollow}` | Seguir um vendedor | US0001 |
| `POST` | `/users/{userId}/unfollow/{userIdToUnfollow}` | Deixar de seguir um vendedor | US0007 |
| `GET` | `/users/{userId}/followers/count` | Obter contagem de seguidores | US0002 |
| `GET` | `/users/{userId}/followers/list?order={order}` | Listar seguidores | US0003 |
| `GET` | `/users/{userId}/followed/list?order={order}` | Listar vendedores seguidos | US0004 |

### Post Endpoints

| Método | Endpoint | Descrição | User Story |
|--------|----------|-----------|------------|
| `POST` | `/products/publish` | Criar uma nova publicação | US0005 |
| `GET` | `/products/followed/{userId}/list?order={order}` | Feed de publicações dos vendedores seguidos | US0006 |
| `POST` | `/products/promo-pub` | Criar publicação promocional | US0010 |
| `GET` | `/products/promo-pub/count?user_id={userId}` | Contagem de produtos em promoção | US0011 |

### Parâmetros de Ordenação

O parâmetro `order` aceita os seguintes valores:
- `name_asc` - Ordenar por nome A-Z
- `name_desc` - Ordenar por nome Z-A
- `date_asc` - Ordenar por data crescente
- `date_desc` - Ordenar por data decrescente