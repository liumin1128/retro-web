import * as React from 'react';

interface ICommentsProps {
  _id: string;
}

const Comments: React.FunctionComponent<ICommentsProps> = (props) => {
  const { _id } = props;
  return <div>{_id}</div>;
};

export default Comments;
