import { Component, component } from '@morfeo/react';
import { Grid, Item } from '../../Grid';
import { Preview } from './Preview';

type Props = {
  componentName: Component;
};

export const Variants: React.FC<Props> = ({ componentName }) => {
  const variants = component(componentName).getVariants();
  const variantKeys = Object.keys(variants || {});

  return (
    <Grid>
      {variantKeys.map(name => (
        <Item key={name}>
          <Preview name={componentName} variant={name} />
        </Item>
      ))}
    </Grid>
  );
};
