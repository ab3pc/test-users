import { ContentType, HttpMethod } from "../enums/enums";

type HttpOptions = {
	method: HttpMethod;
	contentType: ContentType;
	payload: BodyInit | null;
	hasAuth?: boolean;
	queryString?: Record<string, unknown>;
	headers?: Record<string, string>;
};

export { type HttpOptions };
