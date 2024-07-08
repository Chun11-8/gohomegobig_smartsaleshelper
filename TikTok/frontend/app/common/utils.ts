export function joinClasses(
	...classes: Array<string | false | null | undefined>
) {
	let res = "";
	for (let i = 0; i < classes.length - 1; i++) {
		if (classes[i]) res += classes[i] + " ";
	}
	if (classes[classes.length - 1]) res += classes[classes.length - 1];
	return res;
}

export function modifyScrollbar(fn: "hide" | "show") {
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth || 8;
	const styleObj = document.documentElement.style;
	const header = document.querySelector(".app-header header") as HTMLElement;
	if (fn === "hide") {
		styleObj.overflowY = "hidden";
		styleObj.paddingRight = scrollbarWidth + "px";
		header.style.paddingRight = scrollbarWidth + "px";
	} else {
		styleObj.overflowY = "auto";
		styleObj.paddingRight = "unset";
		header.style.paddingRight = "unset";
	}
}

export function handleClickOutside(
	element: HTMLElement | null,
	cb: () => void
) {
	function listener(event: MouseEvent) {
		if (element == null || element.contains(event.target as Node)) return;
		cb();
	}
	document.addEventListener("click", listener);
	return () => document.removeEventListener("click", listener);
}

export function convertToDate(date: string | Date) {
	return new Date(date).toLocaleString(["en-IN", "en-GB", "en"], {
		day: "numeric",
		month: "short",
		hour: "numeric",
		minute: "numeric",
		hour12: true
	});
}

export function getTimeFromSeconds(seconds: number) {
	const mins = Math.floor(seconds / 60);
	const secs = Math.round(seconds % 60);
	const str = `${mins < 10 ? "0" + mins : mins}:${
		secs < 10 ? "0" + secs : secs
	}`;
	return str;
}