import { Dialog } from "radix-ui";

/**
 * @param {String} title - The title of the dialog
 * @param {JSX.Element} triggerComponent - The component that will trigger the dialog
 * @param {JSX.Element} children - The content of the dialog
 * @param {Boolean} isOpen - Whether the dialog is open or not
 * @param {Function} setIsOpen - The function to set the open state of the dialog
 * @returns {JSX.Element}
 */
function DialogPrimitive({ title, triggerComponent, children, open, setOpen }) {
  const triggerElement =
    typeof triggerComponent === "function"
      ? triggerComponent()
      : triggerComponent;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {triggerElement && (
        <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-120 translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-md bg-white p-8 focus:outline-none">
          <Dialog.Title className="text-heading-l">{title}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogPrimitive;
