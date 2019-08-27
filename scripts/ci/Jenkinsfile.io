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

                    docker stop Pie || true && docker rm Pie || true

                    docker run --name Pie -v `pwd`:/app -itd dgs1sdt/blackpearl

                    docker exec Pie /bin/bash -c "/app/scripts/tests.sh"
                    """
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
