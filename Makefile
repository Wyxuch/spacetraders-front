build:
	docker build -t spacetraders-front . ;  docker save path/image:tag | k3s ctr images import -
deployment:
	k3s kubectl apply -f ./deployment.yml
restart_deployment:
	k3s kubectl rollout restart deployment spacetraders-front