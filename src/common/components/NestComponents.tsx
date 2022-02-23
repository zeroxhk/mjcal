import { ReactNode } from 'react';

export const NestComponents = ({
  children,
  components,
}: {
  children: ReactNode;
  components: ((props: { children: ReactNode }) => JSX.Element)[];
}): JSX.Element => components.reduceRight((acc, Component) => <Component>{acc}</Component>, <>{children}</>);
