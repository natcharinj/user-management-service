export const toPlain = obj => JSON.parse(JSON.stringify(obj));

export const paddy = (num, padlen, padchar) => {
	let pad_char = typeof padchar !== 'undefined' ? padchar : '0';
	let pad = new Array(1 + padlen).join(pad_char);
	return (pad + num).slice(-pad.length);
}

export const formatDate = date => {
	let currentDate = date ? new Date(date) : new Date();
	return {
		date: `${currentDate.getFullYear()}-${paddy(parseInt(currentDate.getMonth()) + 1, 2)}-${paddy(currentDate.getDate(), 2)}`,
		time: `${paddy(currentDate.getHours(), 2)}:${paddy(currentDate.getMinutes(), 2)}:${paddy(currentDate.getSeconds(), 2)}`
	};
};

export const successResponse = (payload = {}) => {
	return {
		success: true,
		response: payload
	};
};

export const errorResponse = (message = "") => {
	return {
		success: false,
		error: message
	};
};