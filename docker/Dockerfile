FROM node:14

WORKDIR /app

# 将 package.json 和 package-lock.json 复制到 /app 目录下
COPY dist/package.json ./

# 在 /app 目录下安装依赖
RUN npm install

# 将整个项目文件复制到 /app 目录下
COPY dist/ ./

# 执行 start:pre 脚本
CMD ["npm", "run", "start:pre"]
