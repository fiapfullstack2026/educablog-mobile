FROM node:20-alpine

WORKDIR /app

# Dependências (camada cacheada)
COPY package*.json ./
RUN npm ci

COPY . .

# URL da API embutida no bundle pelo Metro (EXPO_PUBLIC_*)
ARG EXPO_PUBLIC_API_URL=https://educablog.onrender.com
ENV EXPO_PUBLIC_API_URL=${EXPO_PUBLIC_API_URL}

ENV CI=1 \
    EXPO_NO_TELEMETRY=1

# 8081: Metro bundler | 19000/19001: Expo dev tools
EXPOSE 8081 19000 19001

# --lan: o app (Expo Go) na mesma rede acessa o bundler pelo IP da máquina host
CMD ["npx", "expo", "start", "--lan", "--port", "8081"]
