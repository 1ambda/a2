window.ColorMap = {
	darkgreen : '#006400',
	olive : '#808000',
	dodgerblue : '#4682B4',
	teal : '#008080',
	purple : '#800080',
	mediumpurple : '#9370DB',
	orangered : '#FF4500',
	darkslateblue : '#483D8B'
};

window.reservedHours = 336;			// last 2 weeks = 24 * 12 Hours
window.cpuUpgradeCheckHours = 3;	// last 3 hours		
window.cpuUpgradeCheckString = "Last 3 Hours";		
window.cpuUpgradeCondition = 6;
window.cpuDowngradeCondition = 0.5;
window.cpuCheckInterval = 200; // 0.2 Second
window.instanceType = {
	
	// General Purpose
	't1.micro': { downgrade : 'downgrade', upgrade : 'm1.small' },
	'm1.small': { downgrade : 't1.micro', upgrade : 'm1.medium' },
	'm1.medium': { downgrade : 'm1.small', upgrade : 'm1.large' },
	'm1.large': { downgrade : 'm1.medium', upgrade : 'm1.xlarge' },
	'm1.xlarge': { downgrade : 'm1.large', upgrade : 'm3.xlarge' },
	'm3.xlarge': { downgrade : 'm1.xlarge', upgrade : 'm3.2xlarge' },
	'm3.2xlarge': { downgrade : 'm3.xlarge', upgrade : 'upgrade' },
	
	// 	Computing
	// c1.medium < c3.large < c3.xlarge < c1.xlarge < c3.2xlarge < c3.4xlarge < cc2.8xlarge < c3.8xlarge
	'c1.medium': { downgrade : 'downgrade', upgrade : 'c3.large' },
	'c3.large': { downgrade : 'c1.medium', upgrade : 'c3.xlarge' },
	'c3.xlarge': { downgrade : 'c3.large', upgrade : 'c1.xlarge' },
	'c1.xlarge': { downgrade : 'c3.xlarge', upgrade : 'c3.2xlarge' },
	'c3.2xlarge': { downgrade : 'c1.xlarge', upgrade : 'c3.4xlarge' },
	'cc2.8xlarge': { downgrade : 'c3.2xlarge', upgrade : 'c3.8xlarge' },
	'c3.8xlarge': { downgrade : 'cc2.8xlarge', upgrade : 'upgrade' },
	
	// Memory
	// m2.xlarge < m2.2xlarge < m2.4xlarge < cr1.8xlarge
	'm2.xlarge': { downgrade : 'downgrade', upgrade : 'm2.2xlarge' },
	'm2.2xlarge': { downgrade : 'm2.xlarge', upgrade : 'm2.4xlarge' },
	'm2.4xlarge': { downgrade : 'm2.2xlarge', upgrade : 'cr1.8xlarge' },
	'cr1.8xlarge': { downgrade : 'm2.4xlarge', upgrade : 'upgrade' },
};



		