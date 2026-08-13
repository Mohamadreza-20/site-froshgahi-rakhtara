import { useEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";

const EXIT_MS = { site: 160, cms: 200 };

export default function RouteTransition({ outletContext, variant = "site" }) {
	const location = useLocation();
	const outlet = useOutlet(outletContext);

	const [committed, setCommitted] = useState({
		pathname: location.pathname,
		outlet,
	});
	const isExiting = location.pathname !== committed.pathname;
	const timeoutRef = useRef(null);

	useEffect(() => {
		if (!isExiting) return;
		timeoutRef.current = setTimeout(() => {
			setCommitted({ pathname: location.pathname, outlet });
		}, EXIT_MS[variant]);
		return () => clearTimeout(timeoutRef.current);
	}, [location.pathname]);

	const enterClass = variant === "cms" ? "route-cms-in" : "route-fade-in";
	const exitClass = variant === "cms" ? "route-cms-out" : "route-fade-out";

	return (
		<div
			key={committed.pathname}
			className={isExiting ? exitClass : enterClass}
		>
			{isExiting ? committed.outlet : outlet}
		</div>
	);
}
