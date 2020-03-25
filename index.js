import Due from './instance/index.js'

window.D = new Due({
	data: {
		content: '这是一个Due实例',
		title: '你好',
		obj: {
			m: 111,
			n:777
		},
		obj2: {
			x: 111,
			y:777
		}
	}
})
// console.log(myDue)
