docker-compose -f build/docker-compose.yml build
docker push eu.gcr.io/pgmtc-net/vue-portlet
kubectl delete -f build/k8s-deployment.yml
kubectl apply -f build/k8s-deployment.yml
