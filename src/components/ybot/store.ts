import { proxy } from 'valtio';
import { AnimationName, TextureName } from './types';

type Model = {
	animation: AnimationName
	texture: {
		body: TextureName
		joint: TextureName
	}
	isPaused: boolean
}

export const modelState = proxy<Model>({
	animation: 'walking',
	texture: {
		body: '293534_B2BFC5_738289_8A9AA7',
		joint: '3A2412_A78B5F_705434_836C47'
	},
	isPaused: false
})
