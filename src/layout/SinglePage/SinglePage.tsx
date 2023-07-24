import React from 'react';

export type SinglePageProps = {view: React.FunctionComponent}

export default function SinglePage(props: SinglePageProps) {
    return (
      <>
          <props.view/>
      </>
    )
}
