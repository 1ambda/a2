
function createDummyInstances() {
	return [{
		service_name : "T Cloud",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "T Store",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "T Map",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "One ID",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "61.132.14.51",
		security_group : "default"
	}, {
		service_name : "One ID",
		instance_id : "da24lf-foql912",
		instance_type : "m1",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "54.130.214.51",
		security_group : "default"
	}, {
		service_name : "PCS",
		instance_id : "af01lf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}];
};

function createDummyServices() {
	return [{
		service_name : "One ID",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "Hoppin",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "T Cloud",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "OCB",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}];
};
