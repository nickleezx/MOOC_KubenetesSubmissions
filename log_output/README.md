## Exercise 1.1

**Instructions**: Create an application that generates a random string on startup, stores this string into memory, and outputs it every 5 seconds with a timestamp. Deploy it into your Kubernetes cluster and confirm that it's running.

**Solution**:

1. Create kubernetes deployment object

   ```bash
   kubectl create deployment hashgenerator-dep --image=nickleezx/log_output
   ```

2. Check status of deployment

   ```bash
   kubectl get pods
   ```

3. Check logs

   ```bash
   kubectl logs -f hashgenerator-dep-5fcd7cf4d7-xjzp4
   ```

   _Note: replace hashgenerator-dep-5fcd7cf4d7-xjzp4 with pod name_

   ![Ex1.1](./Ex1_1.png)

## Exercise 1.3

**Instructions**: In your "Log output" application, create a folder for manifests and move your deployment into a declarative file. Make sure everything still works by restarting and following logs.

**Solution**:

    apiVersion: apps/v1
        kind: Deployment
        metadata:
        name: hashgenerator-dep
        spec:
        replicas: 1
        selector:
            matchLabels:
            app: hashgenerator
        template:
            metadata:
            labels:
                app: hashgenerator
            spec:
            containers:
                - name: hashgenerator
                image: nickleezx/log_output

![Ex1.3](./Ex1_3.png)

## Exercise 1.7

**Instructions**: Add an endpoint to request the current status (timestamp and the random string) and an Ingress so that you can access it with a browser.

**Solution**:

1. Update log output app found in [/app](./app/) and create new image

2. Update deployment.yaml of image tag
    ```bash
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: hashgenerator-dep
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: hashgenerator
      template:
        metadata:
          labels:
            app: hashgenerator
        spec:
          containers:
            - name: hashgenerator
              image: nickleezx/log_output:0.0.1
              imagePullPolicy: IfNotPresent
              env:
                - name: PORT
                  value: "3002"
    ```

3. Create ingress and service files
    
    ingress.yaml
    ```bash
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: hashgenerator-ingress
    spec:
      rules:
        - http:
            paths:
              - path: /
                pathType: Prefix
                backend:
                  service:
                    name: hashgenerator-svc
                    port:
                      number: 1234
    ```

    service.yaml
    ```bash
    apiVersion: v1
    kind: Service
    metadata:
      name: hashgenerator-svc
    spec:
      type: ClusterIP
      selector:
        app:
          hashgenerator
      ports:  
        - port: 1234
          protocol: TCP
          targetPort: 3002
    ```