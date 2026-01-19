import * as React from "react";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * VisuallyHidden component hides content visually while keeping it accessible to screen readers.
 * Use this for providing context to assistive technologies without affecting visual layout.
 */
function VisuallyHidden({ children, ...props }: VisuallyHiddenProps) {
  return (
    <span
      {...props}
      style={{
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        ...props.style,
      }}
    >
      {children}
    </span>
  );
}

export { VisuallyHidden };
