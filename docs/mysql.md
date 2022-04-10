### mysql 容器创建
docker run --name mysql \
-p 4306:3306 --net mynet --ip 172.18.0.3 \
-v /data/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=000000 -d mysql:5.7
#### 进入mysql容器
docker exec -it mysql /bin/bash
进入mysql client
>mysql -u root -p000000

### redis 容器创建
docker run --name redis \
-p 6379:6379 --net mynet --ip 172.18.0.4 \
-d redis:latest
#### 进入容器
docker exec -it redis /bin/bash
进入redis-cli
> redis-cli

### memcached 容器创建
docker run --name memcached -m 256m \
-p 11211:11211 --net mynet --ip 172.18.0.5 \
-d memcached:1.5-alpine
#### 进入容器

