import type { JSX } from "react/jsx-runtime";
export const Logo = (
	props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		width={80}
		height={80}
		viewBox="0 0 200 200"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<circle cx={100} cy={100} r={90} fill={props.color} />
		<ellipse
			cx={100}
			cy={100}
			rx={50}
			ry={80}
			stroke="#ffffff"
			strokeWidth={5}
			fill="none"
		/>
		<g transform="rotate(60 100 100)">
			<ellipse
				cx={100}
				cy={100}
				rx={50}
				ry={80}
				stroke="#ffffff"
				strokeWidth={5}
				fill="none"
			/>
		</g>
		<g transform="rotate(120 100 100)">
			<ellipse
				cx={100}
				cy={100}
				rx={50}
				ry={80}
				stroke="#ffffff"
				strokeWidth={5}
				fill="none"
			/>
		</g>
		<circle cx={100} cy={100} r={8} fill="#ffffff" />
	</svg>
);
