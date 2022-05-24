import React from 'react'
import { APP_NAME } from 'configs/AppConfig';

export default function Footer() {
	return (
		<footer className="footer">
			<span>Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${APP_NAME}`}</span>   By <a href="http://tunisolutions.com/" target="_blank">Tunisolutions</a></span>
		</footer>
	)
}

