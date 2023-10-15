import { createAsyncThunk } from "@reduxjs/toolkit";

import { ActionType } from "./common";
import {
	AsyncThunkConfig,
	NotificationPayload,
} from "../../common/types/types";

const notify = createAsyncThunk<void, NotificationPayload, AsyncThunkConfig>(
	ActionType.NOTIFY,
	(payload, { extra }) => {
		const { notification } = extra;
		const { type, message } = payload;

		return notification[type](message);
	},
);

export { notify };
