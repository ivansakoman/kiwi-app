import { baseService } from '../../../app/baseService';
import { HttpMethods } from '../../../app/constants/HttpMethods';
import { IComment } from '../interfaces/IComment';

export const mainService = baseService.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query<IComment[], void>({
            query: () => ({
                url: ``,
                method: HttpMethods.GET,
            }),
        }),
        addComment: builder.mutation<void, IComment>({
            query: (body) => ({
                url: ``,
                method: HttpMethods.POST,
                body: body
            }),
        })
    }),
});

export const {
    useLazyGetCommentsQuery,
    useAddCommentMutation
} = mainService;

