import React from "react";
import { Suspense, lazy } from "react";

export function DynamicLoader(props: { component: string, param?: any }) {
  const LazyComponent = lazy(() => import(`${props.component}`));
  return (
    <Suspense fallback={<div className="py-2 px-4">Loading...</div>}>
      <LazyComponent {...props.param} />
    </Suspense>
  );
}
