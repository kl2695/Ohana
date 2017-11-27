
import * as CommentApiUtil from "../util/comment_api_util";
import { receiveSessionErrors, receiveCommentErrors } from "./error_actions";

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_CURRENT_COMMENT = 'RECEIVE_CURRENT_COMMENT';
export const RECEIVE_ONE_COMMENT = 'RECEIVE_ONE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';






export const receiveAllComments = comments => ({
    type: RECEIVE_ALL_COMMENTS,
    comments,
});
export const receiveCurrentComment = comment => ({
    type: RECEIVE_CURRENT_COMMENT,
    comment,
});

export const receiveOneComment = comment => ({
    type: RECEIVE_ONE_COMMENT, 
    comment
});

export const removeComment = comment => ({
    type: REMOVE_COMMENT, 
    comment
});

export const requestAllComments = () => dispatch => {
    return CommentApiUtil.fetchAllComments()
        .fail(errors => dispatch(receiveCommentErrors(errors.responseJSON)))
        .then(Comments => dispatch(receiveAllComments(Comments)));
};

export const requestComment = (commentId) => dispatch => {
    return CommentApiUtil.fetchComment(commentId)
        .fail(errors => dispatch(receiveCommentErrors(errors.responseJSON)))
        .then(comment => dispatch(receiveCurrentComment(comment)));
};

export const createComment = (formComment) => dispatch => {
    return CommentApiUtil.createComment(formComment)
        .fail(errors => dispatch(receiveCommentErrors(errors.responseJSON)))
        .then(comment => dispatch(receiveOneComment(comment)));
};
export const updateComment = (formComment) => dispatch => {
    return CommentApiUtil.updateComment(formComment)
        .fail(errors => dispatch(receiveCommentErrors(errors.responseJSON))) 
        .then(comment => dispatch(receiveOneComment(comment)));
};
export const deleteComment = (formComment) => dispatch => {
    return CommentApiUtil.deleteComment(formComment)
        .fail(errors => dispatch(receiveCommentErrors(errors.responseJSON)))
        .then(comment => dispatch(receiveOneComment(comment)));
};
