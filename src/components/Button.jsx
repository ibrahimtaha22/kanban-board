import { cva } from "class-variance-authority";

const button = cva(["rounded-full px-6 duration-200 text-body-l font-bold "], {
  variants: {
    intent: {
      primary: ["bg-main-purple", "text-white", "hover:bg-main-purple-hover"],
      secondary: [
        "bg-main-purple/10",
        "text-main-purple",
        "hover:bg-main-purple-hover/25",
      ],
      destructive: ["bg-red", "text-white", "hover:bg-red-hover"],
    },
    size: {
      sm: ["h-10"],
      lg: ["h-12"],
    },
    // `boolean` variants are also supported!
    isFullWidth: {
      false: null,
      true: ["w-full"],
    },
    isDisabled: {
      false: null,
      true: ["opacity-25", "cursor-not-allowed", "hover:bg-main-purple"],
    },
  },

  defaultVariants: {
    intent: "primary",
    size: "lg",
  },
});

/**
 * @param {Object} props
 * @param {any} props.children - any type of data element
 * @param {string} props.variant - three types of class color, default "primary", "secondary" ,and "destructive"
 * @param {string} props.size - defalut lg: "h-12" , sm: "h-10"
 * @param {string} props.className - any custom classname to the button
 * @param {boolean} props.isDisabled - true if button disabled
 * @param {boolean} props.isFullWidth - true if 100% width
 * @returns {JSX.Element}
 */
function Button({
  children,
  variant,
  size,
  isDisabled,
  className,
  isFullWidth,
  ...props
}) {
  return (
    <button
      className={button({
        intent: variant,
        size,
        isDisabled,
        className,
        isFullWidth,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
