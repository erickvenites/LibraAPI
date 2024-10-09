
# LibraAPI

LibraAPI é uma API RESTful para gerenciamento de bibliotecas, oferecendo funcionalidades para controle de empréstimos de livros, contagem de penalidades por atrasos, histórico de transações e estatísticas de uso. O sistema é projetado para bibliotecas de médio a grande porte e permite que administradores gerenciem usuários e livros, além de monitorar estatísticas de empréstimos e penalidades.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JSON Web Tokens (JWT)
- **ORM**: Prisma
- **Containerização**: Docker

## Funcionalidades

- **Gerenciamento de Usuários**:
  - Cadastro de usuários com roles (ADMIN, USER)
  - Atualização e exclusão de usuários
  - Contagem de livros emprestados e penalidades aplicadas

- **Gerenciamento de Livros**:
  - Adicionar, atualizar e remover livros
  - Filtragem e pesquisa por título, autor, ISBN e gênero
  - Controle de quantidade disponível

- **Empréstimos de Livros**:
  - Registro de empréstimos com datas de devolução e status ("active", "returned", "overdue")
  - Histórico de transações com ações de empréstimo e devolução

- **Penalidades**:
  - Aplicação de penalidades por atraso na devolução
  - Registro de motivo e valor da penalidade

- **Estatísticas de Livros**:
  - Contagem de visualizações e empréstimos por livro
  - Histórico de transações de livros

## Instalação e Uso

### Pré-requisitos

- **Node.js** v14+ 
- **PostgreSQL** 
- **Docker** (opcional, para containerização)

### Passos para rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/libraapi.git
cd libraapi
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados PostgreSQL no arquivo `.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/libraapi"
JWT_SECRET="sua_chave_secreta"
```

4. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

5. Inicie o servidor:

```bash
npm run dev
```

6. Acesse a API em `http://localhost:3000`.

## Dockerização

Para rodar a aplicação usando Docker, siga os passos abaixo:

1. Certifique-se de que você tenha o **Docker** e o **Docker Compose** instalados.

2. Crie os arquivos `Dockerfile` e `docker-compose.yml` na raiz do seu projeto com o seguinte conteúdo:

**Dockerfile**

```dockerfile
# Usa a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Gera os arquivos Prisma Client para uso no container
RUN npx prisma generate

# Exponha a porta 3000 para acessar a API
EXPOSE 3000

# Define o comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
```

**docker-compose.yml**

```yaml
version: '3.8'

services:
  # Serviço da API
  app:
    build: .
    container_name: libraapi
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/libraapi
      - JWT_SECRET=sua_chave_secreta
    depends_on:
      - db
    volumes:
      - .:/app
    command: npm run dev
    networks:
      - app-network

  # Serviço do banco de dados PostgreSQL
  db:
    image: postgres:15-alpine
    container_name: postgres-libraapi
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: libraapi
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

# Rede compartilhada entre os serviços
networks:
  app-network:
    driver: bridge

# Volume persistente para armazenar os dados do banco de dados
volumes:
  postgres-data:
```

3. Execute o seguinte comando para iniciar os containers:

```bash
docker-compose up --build
```

4. Acesse a aplicação em `http://localhost:3000`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, novas funcionalidades ou correções.