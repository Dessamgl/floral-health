import * as ToastPrimitive from '@radix-ui/react-toast';
import { ToastProvider } from '@radix-ui/react-toast';
import { styled, keyframes } from '@stitches/react';
import { mauve, slate, green, red } from '@radix-ui/colors';

export interface IToast {
  title: string;
  altText: string;
  textButton: string;
  color: "green" | "red";
  open: boolean;
  onClickButtonToast: () => void;
}

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${25}px))` },
  to: { transform: 'translateX(0)' },
});

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${25}px))` },
});

const StyledToast = styled(ToastPrimitive.Root, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  padding: 15,
  display: 'grid',
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: 'auto max-content',
  columnGap: 15,
  alignItems: 'center',

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: 'transform 200ms ease-out',
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },
});

const StyledTitle = styled(ToastPrimitive.Title, {
  gridArea: 'title',
  marginBottom: 5,
  fontWeight: 500,
  color: slate.slate12,
  fontSize: 15,
});

const StyledAction = styled(ToastPrimitive.Action, {
  gridArea: 'action',
});

const StyledViewport = styled(ToastPrimitive.Viewport, {
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: 25,
  gap: 10,
  width: 390,
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none',
});


const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    size: {
      small: {
        fontSize: 12,
        padding: '0 10px',
        lineHeight: '25px',
        height: 25,
      },
    },
    variant: {
      red: {
        backgroundColor: red.red2,
        color: red.red11,
        boxShadow: `inset 0 0 0 1px ${red.red7}`,
        '&:hover': { boxShadow: `inset 0 0 0 1px ${red.red8}`, backgroundColor: mauve.mauve5 },
        '&:focus': { boxShadow: `0 0 0 2px ${red.red8}` },
      },
      green: {
        backgroundColor: green.green2,
        color: green.green11,
        boxShadow: `inset 0 0 0 1px ${green.green7}`,
        '&:hover': { boxShadow: `inset 0 0 0 1px ${green.green8}` },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green8}`, backgroundColor: mauve.mauve5},
      },
    },
  },

  defaultVariants: {
    variant: 'green',
  },
});

export const Toast = ({ title, altText, open, textButton, color, onClickButtonToast }: IToast) => {
  
  return (
    <ToastProvider swipeDirection="up">
      <StyledToast open={open}>
        <StyledTitle>{title}</StyledTitle>
        <StyledAction asChild altText={altText}>
          <Button variant={color} size="small" onClick={onClickButtonToast}>
            {textButton}
          </Button>
        </StyledAction>
      </StyledToast>
      <StyledViewport />
    </ToastProvider>
  );
};