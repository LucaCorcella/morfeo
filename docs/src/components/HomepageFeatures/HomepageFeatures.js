import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useHistory } from '@docusaurus/router';
import { ClickableCard } from '../ClickableCard';
import CLI from './CLI';
import JSIcon from './JSIcon';
import WebExtension from './WebExtension';
import styles from './HomepageFeatures.module.css';

const features = [
  {
    text: 'Web extension',
    link: '/docs/Features/web-extension',
    icon: <WebExtension />,
  },
  {
    text: 'Multi theming',
    link: '/docs/Features/multi-theming',
    icon: '🌞 🌑',
  },
  {
    text: 'Framework agnostic',
    link: '/docs/Features/framework-agnostic',
    icon: '🕍 ⛪ 🕋',
  },
  {
    text: 'Single source of truth',
    link: '/docs/Features/single-source-of-truth',
    icon: <JSIcon />,
  },
  { text: 'Extendible', link: '/docs/Features/extendible', icon: '🧩' },
  { text: 'CLI', link: '/docs/Features/CLI/', icon: <CLI />, badge: 'beta' },
];

export function HomepageFeatures() {
  const history = useHistory();

  const getOnClick = useCallback(
    feature => {
      return () => history.push(feature.link);
    },
    [history.push],
  );

  return (
    <section className={clsx('container', styles.features)}>
      {features.map((feature, index) => (
        <ClickableCard
          key={index}
          icon={feature.icon}
          onClick={getOnClick(feature)}
          badge={feature.badge}
        >
          {feature.text}
        </ClickableCard>
      ))}
    </section>
  );
}
