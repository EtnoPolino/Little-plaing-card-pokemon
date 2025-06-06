import { HttpInterceptorFn } from "@angular/common/http";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
	const token = localStorage.getItem("token"); // je recupere le token du local storage

	let requestToSent = req;

	if (token) {
		const hearders = req.headers.set("Authorization", "Token " + token);
		requestToSent = req.clone({
			headers: hearders,
		});
	}

	return next(requestToSent);
};
