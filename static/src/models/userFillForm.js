import {
	loadTable,
	update,
	save,
	uploadImage,
	addTable,
	updateTable
} from "../services/userFill";

const initState = {
	id: "",
	template: "",
	template_name: "",
	cont: "",
	status: 1,
	time: ""
};

export default {
	namespace: "userFillForm",

	state: {
		...initState
	},

	effects: {
		*loadTable({ payload }, { call, put }) {
			const data = yield call(loadTable, payload);
			if (data && data.success) {
				yield put({ type: "loadTableSuccess", payload: data });
			}
		},

		*saveTable({ payload }, { call, put }) {
			let data = null,
				tableData = null;
			const callback = payload.callback;
			delete payload.callback;
			console.log("payload", payload);
			const params = {
				userName: payload.userName || "",
				userPhone: payload.userPhone || "",
				userLocal: payload.userLocal || "",
				temperature: payload.temperature || "",
				insertTime: payload.insertTime || ""
			};

			if (payload.id) {
				params.id = payload.id;
				data = yield call(update, params);
				// tableData = yield call(updateTable, {
				// 	tableName: payload.template,
				// 	data: JSON.parse(payload.cont)
				// });
			} else {
				data = yield call(save, params);
				// tableData = yield call(addTable, {
				// 	tableName: payload.template,
				// 	data: JSON.parse(payload.cont)
				// });
			}

			yield put({ type: "loadTableSuccess", payload: data });
			callback && callback(data);
		}
	},

	reducers: {
		resetState(state) {
			return { ...state, ...initState };
		},

		loadTableSuccess(state, action) {
			const data = action.payload && action.payload.data;
			if (data) {
				return {
					...state,
					...data,
					cont: window.decodeURIComponent(data.cont || "")
				};
			}
			return state;
		}
	}
};
