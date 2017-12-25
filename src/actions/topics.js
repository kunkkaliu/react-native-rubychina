/**
 * Created by liudonghui on 2017/10/11.
 */
import api from '../api';
export const GETTOPICS = 'topics/reducer/GETTOPICS';
export const GETTOPICS_PENDING = 'topics/reducer/GETTOPICS_PENDING';
export const GETTOPICS_SUCCESS = 'topics/reducer/GETTOPICS_SUCCESS';
export const GETTOPICS_ERROR = 'topics/reducer/GETTOPICS_ERROR';

export const GETTOPICDETAIL = 'topics/reducer/GETTOPICDETAIL';
export const GETTOPICDETAIL_PENDING = 'topics/reducer/GETTOPICDETAIL_PENDING';
export const GETTOPICDETAIL_SUCCESS = 'topics/reducer/GETTOPICDETAIL_SUCCESS';
export const GETTOPICDETAIL_ERROR = 'topics/reducer/GETTOPICDETAIL_ERROR';

export function getTopics(params) {
    return {
        type: GETTOPICS,
        meta: {
            pageIndex: params.pageIndex
        },
        payload: {
            promise: api.get('/topics', {
                params: {
                    ...params,
                    offset: params.limit * params.pageIndex
                }
            })
        }
    }
}

export function getTopicDetail(params) {
    return {
        type: GETTOPICDETAIL,
        payload: {
            promise: api.get(`/topics/${params.id}`, {
                params: params
            })
        }
    }
}