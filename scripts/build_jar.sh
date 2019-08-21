#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
    mvn package -DskipTests
    rm ${BASE_DIR}/artifacts/pie.jar || true
    cp ${BASE_DIR}/target/pie-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/pie.jar
popd
