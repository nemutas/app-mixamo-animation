import React, { VFC } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/css';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { AnimationNames, TextureNames } from './params';
import { modelState } from './store';
import { AnimationName, TextureName } from './types';

export const Controller: VFC = () => {
	return (
		<div className={styles.container}>
			<div>
				<Typography className={styles.text}>Animation</Typography>
				<AnimationSelector />
			</div>

			<div>
				<Typography className={styles.text}>Body Texture</Typography>
				<TextureSelector textureType="body" />
			</div>

			<div>
				<Typography className={styles.text}>Joint Texture</Typography>
				<TextureSelector textureType="joint" />
			</div>

			<ControlButton />
		</div>
	)
}

// ==============================================
const AnimationSelector: VFC = () => {
	// const classes = useStyles()
	const modelSnap = useSnapshot(modelState)

	const handleChange = (event: SelectChangeEvent<AnimationName>) => {
		modelState.animation = event.target.value as AnimationName
	}

	return (
		<Select value={modelSnap.animation} fullWidth variant="standard" onChange={handleChange}>
			{AnimationNames.map((name, i) => (
				<MenuItem key={i} value={name}>
					{name}
				</MenuItem>
			))}
		</Select>
	)
}

// ==============================================
type TextureSelectorProps = {
	textureType: keyof typeof modelState.texture
}

const TextureSelector: VFC<TextureSelectorProps> = ({ textureType }) => {
	// const classes = useStyles()
	const modelSnap = useSnapshot(modelState)

	const handleChange = (event: SelectChangeEvent<TextureName>) => {
		modelState.texture[textureType] = event.target.value as TextureName
	}

	return (
		<Select
			value={modelSnap.texture[textureType]}
			fullWidth
			variant="standard"
			onChange={handleChange}>
			{TextureNames.map((name, i) => {
				const colors = name.split('_')
				return (
					<MenuItem key={i} value={name}>
						<div className={styles.texturePreviewContainer}>
							<div className={styles.texturePreview(colors[0])} />
							<div className={styles.texturePreview(colors[1])} />
							<div className={styles.texturePreview(colors[2])} />
							<div className={styles.texturePreview(colors[3])} />
						</div>
					</MenuItem>
				)
			})}
		</Select>
	)
}

// ==============================================
const ControlButton: VFC = () => {
	const modelSnap = useSnapshot(modelState)

	const clickHandler = () => {
		modelState.isPaused = !modelSnap.isPaused
	}

	return (
		<>
			{modelSnap.isPaused ? (
				<Button variant="contained" endIcon={<PlayArrowIcon />} onClick={clickHandler}>
					play
				</Button>
			) : (
				<Button variant="contained" endIcon={<PauseIcon />} onClick={clickHandler}>
					pause
				</Button>
			)}
		</>
	)
}

// ==============================================
const styles = {
	container: css`
		width: 300px;
		padding: 20px;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 5%;
		display: flex;
		flex-direction: column;
		row-gap: 30px;
	`,
	text: css`
		color: orange;
	`,
	texturePreviewContainer: css`
		width: 100%;
		height: 20px;
		display: grid;
		grid-template-columns: repeat(4, auto);
	`,
	texturePreview: (color: string) => css`
		width: 100%;
		height: 100%;
		background-color: #${color};
	`
}
