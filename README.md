# null-more-learn
Node.js+Express.js+Mysql+Redis+MinIO简单node后端框架项目

# 设计结构
## 分布式设计
| null-more | Redis | Mysql | MinIO | Nginx |
| -------- | -------- | -------- | -------- | -------- |
| 主应用 | 缓存服务 | 数据库 | 文件服务 | 网关 |
| 负责业务服务 | 数据缓存服务 | 数据存储服务 | 文件管理服务 | 简单网关服务
## null-more应用服务分层设计
<img src=".\application.png">