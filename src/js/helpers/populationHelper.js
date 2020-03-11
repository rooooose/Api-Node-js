export function CountUpAnimation() {
	
	const options = {
	  separator: ' ',
	  decimal: '',
	};

	let demo = new CountUp('myTargetElement', 6040, options);
	if (!demo.error) {
	  demo.start();
	} else {
	  console.error(demo.error);
	}
}