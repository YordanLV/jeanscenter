import React from 'react';
import { uid } from 'react-uid';

/* Components */
import ContentLoader from '../../components/common/ContentLoader';

const FacetsLoader = () => (
  <>
    {Array(3)
      .fill()
      .map((elm, index) => {
        return (
          <div key={uid(index)} css={{ marginBottom: '2rem' }}>
            <ContentLoader css={{ height: '4rem', marginBottm: '1rem' }} />
            {Array(5)
              .fill()
              .map((elm, index) => {
                return <ContentLoader key={uid(index)} css={{ height: '2.4rem', marginBottm: '1rem' }} />;
              })}
          </div>
        );
      })}
  </>
);

export default FacetsLoader;
