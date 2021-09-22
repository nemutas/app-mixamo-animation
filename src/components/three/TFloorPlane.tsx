import React, { VFC } from 'react';
import { DoubleSide } from 'three';

type Props = {
	size?: [number, number]
	color?: string
	isGridHelper?: boolean
}

export const TFloorPlane: VFC<Props> = props => {
	const { size = [10, 10], color = 'white', isGridHelper = false } = props

	return (
		<>
			<mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<planeGeometry args={size} />
				<meshPhongMaterial color={color} side={DoubleSide} />
			</mesh>

			{isGridHelper && (
				<gridHelper position={[0, 0.01, 0]} args={[size[0], size[0], 'red', 'black']} />
			)}
		</>
	)
}
