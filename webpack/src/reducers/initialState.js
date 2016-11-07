import defaultValues from '../components/home/initValues';

export default {
	seats: [],
	users: [],
	shownBlocks: {
		infoElement: false,
		searchElement: true,
		modifySeatData: false,
		modifyUserData: false
	},
	selectedSeat: {},
	selectedUser: {},
    ajaxCallsInProgress: 0,
	dataChangeSource: 'system',
	loggedUser: ''
};
