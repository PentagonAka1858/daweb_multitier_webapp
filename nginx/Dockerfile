# De la imagen base Nginx (última versión)
FROM nginx:stable-alpine

# Ejecutamos el comando para borrar el archivo de configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos el archivo "nginx.conf" en la misma ruta a la ruta /etc/nginx/conf.d/ del contenedor
COPY nginx.conf /etc/nginx/conf.d/

# Exponemos el puerto 80 a la red
EXPOSE 80

# El archivo por defecto hace ya este comando, pero no está mal ser explícito
CMD ["nginx", "-g", "daemon off;"]
