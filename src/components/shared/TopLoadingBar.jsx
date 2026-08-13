import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";
import { useLoadingBar } from "../../context/LoadingBarContext";

export default function TopLoadingBar() {
	const navigation = useNavigation();
	const { isLoading: dataLoading } = useLoadingBar();
	const isLoading = navigation.state !== "idle" || dataLoading;

	const [visible, setVisible] = useState(false);
	const [width, setWidth] = useState(0);
	const timers = useRef([]);

	useEffect(() => {
		const clear = () => {
			timers.current.forEach(clearTimeout);
			timers.current = [];
		};

		if (isLoading) {
			clear();
			setVisible(true);
			setWidth(0);
			timers.current.push(setTimeout(() => setWidth(20), 20));
			timers.current.push(setTimeout(() => setWidth(65), 250));
			timers.current.push(setTimeout(() => setWidth(85), 700));
		} else {
			setWidth((previousWidth) => (previousWidth > 0 ? 100 : 0));
			timers.current.push(
				setTimeout(() => {
					setVisible(false);
					setWidth(0);
				}, 300),
			);
		}

		return clear;
	}, [isLoading]);

	if (!visible) return null;

	return (
		<div
			className="fixed top-0 inset-x-0 z-[100] h-[3px] pointer-events-none"
			aria-hidden="true"
		>
			<div
				className="h-full bg-camel transition-[width] duration-300 ease-out"
				style={{
					width: `${width}%`,
					boxShadow: "0 0 8px rgba(212,169,78,0.7)",
				}}
			/>
		</div>
	);
}
