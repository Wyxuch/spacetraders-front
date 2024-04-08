build:
	docker build -t spacetraders-front . ;  docker save spacetraders-front | k3s ctr images import -
push_new_deployment:
	k3s kubectl apply -f ./deployment.yml
restart_deployment:
	k3s kubectl rollout restart deployment spacetraders-front
deploy:
	make build;
	make restart_deployment;