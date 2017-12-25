/**
 * Created by liudonghui on 2017/10/11.
 */
import {
    GETTOPICS_PENDING,
    GETTOPICS_SUCCESS,
    GETTOPICS_ERROR,
    GETTOPICDETAIL_PENDING,
    GETTOPICDETAIL_SUCCESS,
    GETTOPICDETAIL_ERROR
} from '../actions/topics';

const initialState = {
    pagination: {
        pageIndex: 0,
        pageSize: 20
    },
    topics: [],
    loading: false,
    topicDetail: {}
};

export default function home(state = initialState, action) {
    switch (action.type) {
        case GETTOPICS_PENDING:
            return Object.assign({}, state, {
               loading: true
            });
        case GETTOPICS_SUCCESS:
            let pageIndex = action.meta.pageIndex;
            let newTopics = (action.payload.data && action.payload.data.topics) || [];
            return Object.assign({}, state, {
                pagination: {
                    ...state.pagination,
                    pageIndex: pageIndex
                },
                topics: pageIndex == 0 ? newTopics : state.topics.concat(newTopics),
                loading: false
            });
        case GETTOPICS_ERROR:
            return Object.assign({}, state, {
                loading: false
            });

        case GETTOPICDETAIL_PENDING:
            return Object.assign({}, state, {
                topicDetail: {}
            });
        case GETTOPICDETAIL_SUCCESS:
            return Object.assign({}, state, {
                topicDetail: (action.payload.data && action.payload.data.topic) || {}
            });

        default:
            return state;
    }
}