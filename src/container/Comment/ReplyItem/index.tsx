import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Stack from '@mui/material/Stack';
import {
  ReplyFieldsFragment,
  useCreateLikeMutation,
  LikeObjectUnionModel,
  CommentFieldsFragmentDoc,
} from '@/generated/graphql';
import CommentItem from '@/components/Comment/ReplyItem';
import CommentReply from '@/container/Comment/Create/Reply';

interface ICommentItemContainerProps {
  comment: ReplyFieldsFragment;
}

const CommentItemContainer: React.FunctionComponent<
  ICommentItemContainerProps
> = (props) => {
  const { comment } = props;

  const [replyVisible, setReplyVisible] = useState<boolean>(false);

  const [createLike] = useCreateLikeMutation();

  const handleLike = () => {
    createLike({
      variables: {
        object: comment._id,
        objectModel: LikeObjectUnionModel.Comment,
      },
      // optimisticResponse: {
      //   createLike: comment.likeStatus
      //     ? null
      //     : {
      //         __typename: 'Like',
      //         _id: '',
      //       },
      // },
      update(cache, { data }) {
        cache.updateFragment(
          {
            id: `Comment:${comment?.commentTo?._id}`,
            fragment: CommentFieldsFragmentDoc,
          },
          (item) => {
            const idx = item.comments.findIndex((i) => i._id === comment._id);

            let likeStatus;
            let likeCount = comment.likeCount || 0;
            if (data?.createLike) {
              likeCount += 1;
              likeStatus = true;
            } else {
              likeCount -= 1;
              likeStatus = false;
            }

            const temp = cloneDeep(item);

            temp.comments[idx].likeStatus = likeStatus;
            temp.comments[idx].likeCount = likeCount;

            return temp;
          },
        );
      },
    });
  };

  return (
    <Stack spacing={2}>
      <CommentItem
        comment={comment}
        onZan={handleLike}
        onReply={() => {
          setReplyVisible(!replyVisible);
        }}
      />
      {replyVisible && (
        <CommentReply
          to={comment}
          onCompleted={() => {
            setReplyVisible(false);
          }}
        />
      )}
    </Stack>
  );
};

export default CommentItemContainer;
