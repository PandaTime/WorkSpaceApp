export default {
	newSeatForm: {
		id: ()=>{return Math.random().toString(36).substr(2, 9)},
		newId: true,
		name: 'xxNAMExx',
		x: 150,
		y: 75,
		radius: 20,
		floor: 8,
		fillStyle: 'rgba(147, 197, 114, 0.8)',
		assignedTo: {id: null, firstName: null, surName: null}
	},
	newUserForm:{
		id: ()=>{return Math.random().toString(36).substr(2, 9)},
		firstName: '',
		surName: '',
		seatId: {id: null, name: null}
	}
}