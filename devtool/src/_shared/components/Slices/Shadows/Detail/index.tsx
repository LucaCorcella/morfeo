import React from 'react';
import { Shadow, useStyle } from '@morfeo/react';
import { Card } from '../../../Card';
import { useRouter } from '../../../../hooks';
import { RouteState } from '../../../../contexts';
import styles from './style.module.css';

export const Detail: React.FC = () => {
  const { route } = useRouter();
  const { state = {} as RouteState } = route;
  const { detailKey } = state;
  const { boxShadow } = useStyle({ shadow: detailKey as Shadow });

  return (
    <div className={styles.container}>
      <Card className="morfeo-card-primary">
        <Card
          className="morfeo-card"
          style={
            {
              shadow: detailKey as Shadow,
              size: 'var(--sizes-xxl)',
              corner: 'var(--radii-xxs)',
              bg: 'var(--colors-primary)',
            } as any
          }
        />
      </Card>
      <h2 className="morfeo-typography-h2">box-shadow: {boxShadow}</h2>
    </div>
  );
};
