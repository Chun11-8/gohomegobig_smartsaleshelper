import { useEffect, Suspense, lazy } from "react";

import "./frontend/app/common/styles.scss";
import { authActions } from "./app/common/store/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "./app/common/store";
import FullscreenSpinner from "./app/common/components/fullscreen-spinner";
import constants from "./app/common/constants";
const MobileLayout = lazy(() => import("./app/"));

export default function App() {
	const dispatch = useAppDispatch();
	const authStatus = useAppSelector(state => state.auth.status);
	const isMobile = window.matchMedia(
		"(max-width: " + constants.mobileWidth + "px)"
	).matches;

	useEffect(() => {
		dispatch(authActions.loginOnLoad());
	}, [dispatch]);

	return authStatus === "fetching" ? (
		<FullscreenSpinner />
	) : (
		<Suspense fallback={<FullscreenSpinner />}>
			{isMobile ? <MobileLayout /> : <MobileLayout />}
		</Suspense>
	);
}