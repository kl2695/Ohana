import * as LikeApiUtil from '../util/like_api_util';


export const RECEIVE_LIKE = 'RECEIVE_LIKE'; 
export const REMOVE_LIKE = 'REMOVE_LIKE';

export const receiveLike = like => ({
    type: RECEIVE_LIKE, 
    like 
}); 

export const removeLike = like => ({
    type: REMOVE_LIKE, 
    like 
});


export const createLike = formLike => dispatch => {
    return LikeApiUtil.createLike(formLike)
            .then(like =>  dispatch(receiveLike(like)));
}; 

export const deleteLike = likeId => dispatch => {
    return LikeApiUtil.destroyLike(likeId)
            .then(like => dispatch(removeLike(like)));
};