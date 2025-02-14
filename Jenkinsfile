pipeline {
    agent any

    stages {
        stage('Git') {
            steps {
                echo 'Récupataion code de git ';
                git branch :'master',
                url :'https://github.com/donia102000/paris_events_front.git';

            }
        }



        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image"
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                       sh " docker build -t  ${DOCKER_USERNAME}/paris_events_front:1.0.0 ."

                    }
                }
            }
        }

    stage('Docker Push') {
    steps {
        script {
            echo "Pushing Docker image to Docker Hub"
            withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                // Authentification avec Docker Hub
                sh """
                    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                    docker push ${DOCKER_USERNAME}/paris_events_front:1.0.0
                """
            }
        }
    }
}



}
}
