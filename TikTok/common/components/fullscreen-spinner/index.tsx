import classes from "./fullscreen-spinner.module.scss";
import LoadingSpinner from "../loading-spinner";
import { joinClasses } from "../../utils";
import { ComponentProps } from "../../types";

export default function FullscreenSpinner({ className }: ComponentProps) {
	return (
		<div className={joinClasses(classes["fsspinner-container"], className)}>
			<LoadingSpinner className={classes["fsspinner"]} />
		</div>
	);
}