import React from 'react';

export const StyleRoot: React.FC<any> = (props) => {
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {className: props.className} as any);
    }
    return child;
  })
  return (
    <>
      {childrenWithProps}
    </>
  )
}