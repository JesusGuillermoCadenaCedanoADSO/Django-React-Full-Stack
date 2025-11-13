# Etapa 1: Construcción
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:stable-alpine
# Elimina la configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf
# Copia nuestra configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia los archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
