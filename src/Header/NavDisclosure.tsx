import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, PropsWithChildren } from "react";

interface NavDisclosureProps {
  button: JSX.Element;
  className?: string;
  panelClassName?: string;
}

const NavDisclosure = (props: PropsWithChildren<NavDisclosureProps>) => {
  return (
    <Disclosure as="div" className={classNames(props.className)}>
      {({ open }) => (
        <>
          <Disclosure.Button className="block">
            {props.button}
          </Disclosure.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className={props.panelClassName} static>
              {props.children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default NavDisclosure;
