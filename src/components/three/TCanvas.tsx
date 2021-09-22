import React, { VFC } from 'react';
import { Canvas } from '@react-three/fiber';

type Props = {
	children: React.ReactNode
	fov?: number
	position?: [number, number, number]
}

export const TCanvas: VFC<Props> = props => {
	const { children, fov = 50, position = [0, 3, 10] } = props
	return (
		<Canvas camera={{ fov, position }} dpr={[1, 2]} shadows>
			{children}
		</Canvas>
	)
}
