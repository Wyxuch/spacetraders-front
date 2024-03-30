build:
	docker build -t spacetraders-front . ;  docker save path/image:tag | k3s ctr images import -
