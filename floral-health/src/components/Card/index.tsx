import Box from '@mui/material/Box';
import Card, {CardProps} from '@mui/material/Card';

import styles from './styles.module.scss'; 

export function CardFloral({
  children,
}: CardProps) {
  return (
    <Box sx={{ minWidth: 275 }} display="flex">
      <Card className={styles.containerCard} variant="outlined">
        {children}
      </Card>
    </Box>
  );
}