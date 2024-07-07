import io from "socket.io-client";

import { apiClient, baseURL } from ".";
import { VideoQuery } from "../types";

const videoURL = "/video";

interface NonFormData {
	caption: string;
	music: string;
	tags: string;
	username: string;
	filename?: string;
}

export async function createVideo(
	formData: FormData,
	nonFormData: NonFormData,
	progressFn: (type: "upload" | "compress", e?: any) => void,
	completeFn: (videoId: string) => void,
	errFn: (err: Error) => void
) {
	nonFormData.filename = (
		await apiClient.post(videoURL + "/create", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			timeout: 0,
			onUploadProgress: e =>
				progressFn("upload", Math.round((e.loaded * 100) / e.total))
		})
	).data.filename;

	const socket = io(baseURL);

	socket.emit("finaliseFile", nonFormData);
	socket.on("compressionProgress", compData =>
		progressFn("compress", compData)
	);
	socket.on("compressionComplete", compData => {
		completeFn(compData.videoId);
		socket.disconnect();
	});
	socket.on("compressionError", err => {
		errFn(err);
		socket.disconnect();
	});

	return socket;
}

const params: VideoQuery = {
	uploader: "1",
	caption: "1",
	music: "1",
	shares: "1",
	views: "1",
	createdAt: "1",
	likes: "1",
	tags: "1",
	comments: "num"
};
export const getVideo = (id: string, username?: string | null) =>
	apiClient.get(videoURL + "/" + id, { params: { ...params, username } });

export const getCustom = (id: string, p: VideoQuery) =>
	apiClient.get(videoURL + "/" + id, { params: p });

export const getVidComments = (id: string, username?: string | null) =>
	apiClient.get(videoURL + "/" + id, {
		params: { comments: "list", username }
	});

export const deleteVideo = (id: string, username: string, token: string) =>
	apiClient.delete(videoURL + "/" + id, {
		data: { username, token }
	});

export const likeVideo = (username: string, id: string, token: string) =>
	apiClient.post(videoURL + "/like", { username, videoId: id, token });

export const postComment = (
	username: string,
	comment: string,
	videoId: string,
	token: string
) =>
	apiClient.post(videoURL + "/comment", { username, comment, videoId, token });

export const likeComment = (
	videoId: string,
	commentId: string,
	username: string,
	token: string
) =>
	apiClient.post(videoURL + "/likeComment", {
		videoId,
		commentId,
		username,
		token
	});

export const deleteComment = (
	commentId: string,
	videoId: string,
	username: string,
	token: string
) =>
	apiClient.delete(videoURL + "/comment", {
		data: { commentId, videoId, username, token }
	});

export const reply = (
	comment: string,
	commentId: string,
	videoId: string,
	username: string,
	token: string
) =>
	apiClient.post(videoURL + "/reply", {
		comment,
		commentId,
		videoId,
		username,
		token
	});

export const deleteReply = (
	videoId: string,
	commentId: string,
	replyId: string,
	username: string,
	token: string
) =>
	apiClient.delete(videoURL + "/reply", {
		data: { videoId, commentId, replyId, username, token }
	});

export const getReplies = (
	videoId: string,
	commentId: string,
	username?: string | null
) =>
	apiClient.get(videoURL + "/getReplies", {
		params: { videoId, commentId, username }
	});

export const likeReply = (
	videoId: string,
	commentId: string,
	replyId: string,
	username: string,
	token: string
) =>
	apiClient.post(videoURL + "/likeReply", {
		videoId,
		commentId,
		replyId,
		username,
		token
	});

export const share = (videoId: string) =>
	apiClient.post(videoURL + "/share", { videoId });