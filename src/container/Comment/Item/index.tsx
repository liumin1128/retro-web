import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import {
  CommentFieldsFragment,
  useCreateLikeMutation,
  LikeObjectUnionModel,
  CommentFieldsFragmentDoc,
} from '@/generated/graphql';
import CommentItem from '@/components/Comment/Item';
import CommentReply from '@/container/Comment/Create/Reply';

interface ICommentItemContainerProps {
  comment: CommentFieldsFragment;
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
      update(cache, { data }) {
        cache.updateFragment(
          {
            id: `Comment:${comment._id}`,
            fragment: CommentFieldsFragmentDoc,
          },
          (item) => {
            let likeStatus;
            let likeCount = comment.likeCount || 0;
            if (data?.createLike) {
              likeCount += 1;
              likeStatus = true;
            } else {
              likeCount -= 1;
              likeStatus = false;
            }
            return { ...item, likeCount, likeStatus };
          },
        );
      },
    });
  };

  return (
    <Stack spacing={2}>
      <CommentItem
        comment={comment}
        onZan={() => {
          handleLike();
        }}
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
