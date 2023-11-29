import { PropsWithChildren } from 'react';

const NoLayout = (props: PropsWithChildren) => {
  return <div>{props.children}</div>;
};
export default NoLayout;
