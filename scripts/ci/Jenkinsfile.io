properties(
    [
        buildDiscarder(
            logRotator(
                numToKeepStr: '10'
            )
        ),
        disableConcurrentBuilds()
    ]
)
// change node back to node ('') for recent version, legacy for old
node ('legacy') {
    stage ('Checkout') {
        if(env.BRANCH_NAME == 'acceptance') {
            git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/pie.git', branch: 'acceptance', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
        } else if (env.BRANCH_NAME == 'master') {
            git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/pie.git', branch: 'master', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
        }
    }

    stage ('Test & Build') {
                    sh """
                    docker pull dgs1sdt/blackpearl

                    docker stop BlackPearl || true && docker rm BlackPearl || true

                    docker run --name BlackPearl -v `pwd`:/app -itd dgs1sdt/blackpearl:cfs3linux

                    docker exec BlackPearl /bin/bash -c "/app/scripts/tests.sh"
                    """
            }


    stage ('SonarQube') {
       def sonarXmx = '512m'
       def sonarHost = 'https://sonar.geointservices.io'
       def scannerHome = tool 'SonarQube Runner 2.8';
       withSonarQubeEnv('DevOps Sonar') {
           // update env var JOB_NAME to replace all non word chars to underscores
           def jobname = JOB_NAME.replaceAll(/[^a-zA-Z0-9\_]/, "_")
           def jobshortname = JOB_NAME.replaceAll(/^.*\//, "")
           withCredentials([[$class: 'StringBinding', credentialsId: '0987OIUY9876YTFC7654YTFC6754TRDX', variable: 'SONAR_LOGIN']]) {
               sh "JOB_NAME=${jobname} && JOB_SHORT_NAME=${jobshortname} && set && ${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${sonarHost} -Dsonar.login=${SONAR_LOGIN} -Dsonar.projectName=pie -Dsonar.projectKey=Narwhal:Pie"
           }
       }
    }

    stage ('Fortify') {
       sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} -clean'
       sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} "**/*" -exclude "client/node_modules/**/*" -exclude "client/build/**/*" -exclude ".mvn/**/*" -exclude "target/**/*" -exclude "src/main/resources/static/**/*" -exclude "acceptance/node_modules/**/*" -exclude "**/squashfs-root/**/*"'
       sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} -scan -f fortifyResults-${BUILD_NUMBER}.fpr'
    }

    stage ('ThreadFix') {
       withCredentials([string(credentialsId: '7654JHGF9876HGFD6543LKJH5432GFDS', variable: 'THREADFIX_VARIABLE')]) {
       sh "/bin/curl -v --insecure -H 'Accept: application/json' -X POST --form file=@fortifyResults-${BUILD_NUMBER}.fpr\
           https://threadfix.devops.geointservices.io/rest/applications/241/upload?apiKey=${THREADFIX_VARIABLE}"
       }
    }

    if(env.BRANCH_NAME == 'acceptance') {
        stage ('Deploy NGA') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '8e717287-708e-440f-8fa8-17497eac5efb', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {
                withEnv(["CF_HOME=${pwd()}"]) {
                    sh "cf login -a api.system.dev.east.paas.geointservices.io -u $PCFUser -p $PCFPass -o DGS1SDT -s 'Pie'"
                    sh "cf push -f ./manifest-acceptance.yml"
                }
            }
        }
    } else if(env.BRANCH_NAME == 'master') {
        stage ('Deploy NGA') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '8e717287-708e-440f-8fa8-17497eac5efb', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {
                withEnv(["CF_HOME=${pwd()}"]) {
                    sh "cf login -a api.system.dev.east.paas.geointservices.io -u $PCFUser -p $PCFPass -o DGS1SDT -s 'Pie'"
                    sh "cf push -f ./manifest.yml"
                }
            }
        }
    }
}
