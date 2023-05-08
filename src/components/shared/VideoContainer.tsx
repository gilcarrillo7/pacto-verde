import React from "react";
import ReactPlayer from "react-player";

const VideoContainer = ({
	url,
	youtube = false,
}: {
	url: string;
	youtube?: boolean;
}) => {
	return (
		<div className="w-screen gradient-home">
			<div
				className={`container py-8 sm:py-16 ${
					youtube ? "h-[300px] sm:h-[100vh] sm:min-h-[600px]" : ""
				}`}
			>
				<ReactPlayer url={url} width="100%" height="100%" />
			</div>
		</div>
	);
};

export default VideoContainer;
