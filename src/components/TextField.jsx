import clsx from "clsx";

/**
 * @param {Object} props
 * @param {string} props.defaultValue - default value of input text
 * @param {string} props.name - name of input text
 * @param {string} props.placeholder - placeholder of input text
 * @param {boolean} props.isInvalid - validate value for empty input
 * @param {boolean} props.required - true value for required input
 * @returns {JSX.Element}
 */

function TextField({
  defaultValue,
  required,
  name,
  placeholder,
  isInvalid,
  ...props
}) {
  return (
    <div className="relative flex min-w-80 flex-1 items-center">
      {isInvalid && (
        <span className="text-red text-body-l absolute right-4">
          can not be empty
        </span>
      )}
      <input
        type="text"
        defaultValue={defaultValue}
        required={required}
        name={name}
        placeholder={placeholder}
        className={clsx(
          "border-medium-grey/25 text-body-l w-full rounded-sm border py-2 pl-4",
          {
            "border-red": isInvalid,
            "pr-4": !isInvalid,
          },
        )}
        {...props}
      />
    </div>
  );
}

export default TextField;
