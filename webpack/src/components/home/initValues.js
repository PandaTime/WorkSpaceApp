export default {
	newSeatForm: {
		id: ()=>{return '_' + Math.random().toString(36).substr(2, 9)},
		newId: true,
		x: 150,
		y: 75,
		radius: 20,
		floor: 8,
		assignedTo: null
	}
}