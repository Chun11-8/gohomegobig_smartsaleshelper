import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

import "./comments-modal.scss";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { CommentData } from "../../../common/types";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { getVidComments } from "../../../common/api/video";
import { joinClasses } from "../../../common/utils";
import { authModalActions } from "../../../common/store/slices/auth-modal-slice";

interface Props {
	uploader: string;
	setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
	videoId: string;
	totalComments: number;
}

export type ReplyTo = {
	name: string;
	commentId: string;
	setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
	setReplies: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
	setRepliesNum: React.Dispatch<React.SetStateAction<number>>;
	fetchReplies: () => void;
};

const animationTime = 199; // milliseconds to reveal/hide modal

export default function CommentsModal({
	videoId,
	uploader,
	setShowComments,
	totalComments
}: Props) {
	const dispatch = useAppDispatch();
	const { username, isAuthenticated: isAuthed } = useAppSelector(
		state => state.auth
	);
	const modalRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const [comments, setComments] = useState<CommentData[] | null>(null);
	const [replyTo, setReplyTo] = useState<ReplyTo | null>(null);

	const fetchComments = useCallback(() => {
		errorNotification(
			async () => {
				const res = await getVidComments(videoId, username);
				setComments(res.data.comments);
			},
			dispatch,
			() => setComments([]),
			"Couldn't load comments:"
		);
	}, [username, dispatch, videoId]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	const handleModalClose = useCallback(() => {
		modalRef.current!.classList.remove("reveal");
		modalRef.current!.classList.add("hide");

		backdropRef.current!.classList.remove("show");
		backdropRef.current!.classList.add("hide");

		setTimeout(() => {
			setShowComments(false);
		}, animationTime);
	}, [setShowComments]);

	useEffect(() => {
		setTimeout(() => {
			if (!modalRef.current || !backdropRef.current) return;
			modalRef.current.classList.add("reveal");
			backdropRef.current.classList.add("show");
		}, 10);
	}, []);

	return createPortal(
		<>
			<div
				className="backdrop comments-backdrop"
				ref={backdropRef}
				onClick={handleModalClose}
			/>
			<div
				className={joinClasses(
					"comments-modal-container",
					!isAuthed && "unauthed"
				)}
				ref={modalRef}
			>
				{!isAuthed ? (
					<>
						<div className="image-container">
							<img
								src="https://lf16-tiktok-common.ibytedtos.com/obj/tiktok-web-common-sg/mtact/static/pwa/icon_128x128.png"
								alt="tiktok logo"
							/>
						</div>
						<h3>Join the conversation</h3>
						<p>View and add comments with a TikTok account</p>
						<button
							className="primary-button"
							onClick={() => dispatch(authModalActions.showModal())}
						>
							Log in
						</button>
					</>
				) : (
					<>
						<header>
							<span />
							<p>
								{totalComments} {totalComments === 1 ? "comment" : "comments"}
							</p>
							<span>
								<i className="fas fa-close" onClick={handleModalClose} />
							</span>
						</header>
						<div className="comments-container">
							{!comments ? (
								<LoadingSpinner className="spinner" />
							) : (
								comments.map((comment, i) => (
									<Comment
										key={i}
										{...comment}
										uploader={uploader}
										videoId={videoId}
										setReplyTo={setReplyTo}
										setComments={setComments}
										fetchComments={fetchComments}
									/>
								))
							)}
						</div>
						<AddComment
							fetchComments={fetchComments}
							setComments={setComments}
							videoId={videoId}
							replyTo={replyTo}
							setReplyTo={setReplyTo}
						/>
					</>
				)}
			</div>
		</>,
		document.querySelector("#portal")!
	);
}