FROM dgs1sdt/blackpearl

USER root

# setup_env
ENV PIE_DB_URL=jdbc:mysql://localhost:3306/pie?useSSL=false
ENV PIE_DB_USERNAME=pie
ENV PIE_CI=true

# install dependencies from new repositories

# setup mysql

ENTRYPOINT service mysql start &&\
    mysql -u root -e "create database pie;" || true &&\
    mysql -u root -e "create user 'pie'@'localhost';" || true &&\
    mysql -u root -e "GRANT ALL PRIVILEGES ON pie.* TO 'pie'@'localhost';" || true &&\
    /bin/bash
