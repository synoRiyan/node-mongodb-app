pipeline {
    agent any

    environment {
        // Define any required environment variables here
        DOCKER_IMAGE = "node-mongo-sample-app"
        MONGO_IMAGE = "mongo:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout your code from the repository
                git 'https://github.com/synoRiyan/node-mongodb-app.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build the Node.js Docker image
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Run MongoDB') {
            steps {
                script {
                    // Pull and run MongoDB container
                    docker.image(MONGO_IMAGE).run('-d --name mongodb-container -p 27017:27017')
                }
            }
        }

        stage('Run Node.js App') {
            steps {
                script {
                    // Run Node.js app container with MongoDB link
                    docker.image(DOCKER_IMAGE).run('-d --name node-app-container --link mongodb-container:mongo -p 3000:3000')
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests inside the Node.js container
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Stop and remove containers after tests
                    sh 'docker stop node-app-container mongodb-container'
                    sh 'docker rm node-app-container mongodb-container'
                }
            }
        }
    }

    post {
        always {
            // Clean up the workspace
            cleanWs()
        }
        success {
            echo "Build and tests were successful!"
        }
        failure {
            echo "Build or tests failed!"
        }
    }
}
