library 'jenkins-ptcs-library@feature/npm-publish'

podTemplate(label: pod.label,
  containers: pod.templates + [
    containerTemplate(name: 'node', image: 'node:10', ttyEnabled: true, command: '/bin/sh -c', args: 'cat')
  ]
) {
    def project = 'pdf-storage'

    node(pod.label) {
      stage('Checkout') {
         checkout scm
      }
      stage('Build') {
        container('node') {
          sh """
            npm install
          """
        }
      }
      stage('Test') {
        container('node') {
          sh """
            npm test
          """
        }
      }
      stage('Package') {
          publishTagToNpm()
      }
    }
  }
