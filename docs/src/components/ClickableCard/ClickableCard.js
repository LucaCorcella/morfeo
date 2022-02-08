import React from 'react';
import styles from './ClickableCard.module.css';
import ArrowRight from './ArrowRight';
import clsx from 'clsx';

export function ClickableCard({
  children,
  badge,
  icon,
  onClick,
  className,
  textClassName,
}) {
  return (
    <div
      className={clsx('morfeo-card-outlined', styles.container, className)}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {badge && <span className={styles.badge}>{badge}</span>}
      <ArrowRight onClick={onClick} className={styles.arrowRight} />
      {children}
    </div>
  );
}
