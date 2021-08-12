import React, { lazy, Suspense } from "react";
import ProgressBar from "react-topbar-progress-indicator";

ProgressBar.config({
  barColors: {
    "0": "#ff0000",
  },
});

type ImportFunc = () => Promise<{
  default: React.ComponentType<any>;
}>;

const lazyLoading = (importFunc: ImportFunc) => {
  const LazyComponent = lazy(importFunc);
  return (props: React.ComponentProps<typeof LazyComponent>) => (
    <Suspense fallback={<ProgressBar />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default lazyLoading;
