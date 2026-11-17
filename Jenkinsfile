
pipeline {
    agent any

    environment {
        JAVA_HOME = '/usr/lib/jvm/java-21-amazon-corretto.x86_64'
        PATH = '/usr/lib/jvm/java-21-amazon-corretto.x86_64/bin:/usr/share/maven/bin:/usr/bin:/bin'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'java -version'
                sh 'mvn -version'
                sh 'mvn clean package'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t quickfix-helpdesk:${BUILD_NUMBER} .'
                sh 'docker tag quickfix-helpdesk:${BUILD_NUMBER} quickfix-helpdesk:latest'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f quickfix-app || true
                    docker run -d --restart unless-stopped --name quickfix-app -p 8081:8080 quickfix-helpdesk:latest
                '''
            }
        }
    }
}

