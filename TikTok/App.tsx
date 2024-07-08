import { useEffect, Suspense, lazy } from "react";

import "./frontend/app/common/styles.scss";
import { authActions } from "./frontend/app/common/store/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "./frontend/app/common/store";
import FullscreenSpinner from "./frontend/app/common/components/fullscreen-spinner";
import constants from "./frontend/app/common/constants";
const MobileLayout = lazy(() => import("./frontend/app"));

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