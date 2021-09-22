/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useAnimations, useGLTF } from '@react-three/drei';
import { AnimationNames } from './params';
import { modelState } from './store';

export const useAnimation = () => {
	const modelSnap = useSnapshot(modelState)

	const animationClips: THREE.AnimationClip[] = []
	AnimationNames.forEach(name => {
		const { animations } = useGLTF(`/assets/animations/${name}.glb`)
		animationClips.push(...animations)
	})

	const { actions, ref } = useAnimations(animationClips)

	// animation
	useEffect(() => {
		actions[modelSnap.animation]?.reset().fadeIn(0.5).play()

		return () => void actions[modelSnap.animation]?.fadeOut(0.5)
	}, [actions, modelSnap.animation])

	// pause
	useEffect(() => {
		const action = actions[modelSnap.animation]
		if (action) {
			action.paused = modelSnap.isPaused
		}
	}, [actions, modelSnap.animation, modelSnap.isPaused])

	return ref
}
