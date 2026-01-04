## Exercise 1.2

**Instructions**: Create a web server that outputs "Server started in port NNNN" when it is started and deploy it into your Kubernetes cluster. Please make it so that an environment variable PORT can be used to choose the used port. You may call the server todo app since it will, amongst other things, provide the functionality of a todo application pretty soon.

**Solution**

1. Create kubernetes deployment object
   ```bash
   kubectl create deployment server-dep --image=nickleezx/the_project:0.0.1
   ```
2. Check status of deployment

   ```bash
   kubectl get pods
   ```

3. Check logs

   ```bash
   kubectl logs -f server-dep-bdcddb694-fjdlj
   ```

   _Note: replace server-dep-bdcddb694-fjdlj with pod name_

   ![Ex1.2](./Ex1_2.png)

## Exercise 1.4

**Instructions**: Create a deployment.yaml for the course project (that you started in Exercise 1.2.)

**Solution**:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: express-server-dep
    spec:
      selector:
        matchLabels:
          app: express-server
      template:
        metadata:
          labels:
            app: express-server
        spec:
          containers:
            - name: myapp
              image: nickleezx/the_project

![Ex1.4](./Ex1_4.png)

## Exercise 1.5

**Instructions**: Make the project respond something to a GET request sent to the / url of the project. A simple HTML page is good, or you can deploy something more complex, like a single-page application.

**Solution**:

![Ex1.5](./Ex1_5.png)