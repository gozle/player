import React from 'react';

import styles from './ad-label.module.scss';

export const AdLabel = React.memo(() => (
  <div className={styles.label}>Реклама</div>
));
AdLabel.displayName = 'AdLabel';
