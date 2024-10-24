pipeline {
    agent {
        docker {
            image 'node:18' // You can change to a Node.js version you prefer
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Bind mount Docker socket
        }
    }
    environment {
        // Defining MongoDB container
        MONGO_CONTAINER = 'mongo:5' // Change to MongoDB version if needed
        GIT_URL = 'https://github.com/synoRiyan/node-mongodb-app.git'
        BRANCH_NAME = 'main' // Change if your default branch is not main
    }
    stages {
        stage('Checkout') {
            steps {
                git url: "${env.GIT_URL}", branch: "${env.BRANCH_NAME}"
            }
        }
        stage('Setup MongoDB') {
            steps {
                script {
                    docker.image(env.MONGO_CONTAINER).withRun('-p 27017:27017 --name mongodb') { c ->
                        echo "MongoDB container started with ID: ${c.id}"
                        sleep 10 // Wait for MongoDB to initialize
                    }
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
            sh 'docker rm -f mongodb' // Stop and remove MongoDB container after build
        }
    }
}
