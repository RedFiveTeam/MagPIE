#! /bin/bash
set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
   mvn -Dflyway.user=${PIE_DB_USERNAME} -Dflyway.password= -Dflyway.url=${PIE_DB_URL} clean flyway:migrate package
    rm ${BASE_DIR}/artifacts/magpie.jar || true
    cp ${BASE_DIR}/target/magpie-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/magpie.jar
popd
