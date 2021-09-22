import React, { VFC } from 'react';
import { css } from '@emotion/css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import { YBot } from './ybot/YBot';

export const App: VFC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className={styles.container}>
				<YBot />
			</div>
		</ThemeProvider>
	)
}

const styles = {
	container: css`
		width: 100vw;
		height: 100vh;
	`
}

const theme = createTheme({
	palette: {
		primary: orange,
		mode: 'dark'
	}
})
