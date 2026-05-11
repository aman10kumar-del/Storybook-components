/// <reference types="react-scripts" />

interface Window { 
  JSBridge: {
    subscribe?: (bridgeName: string, bridgeInput?: unknown, bridgeCallback?: (res: unknown) => void) => void;
    call: (
      bridgeName: string,
      bridgeInput?: unknown,
      bridgeCallback?: (res: unknown) => void,
      bridgeMeta?: unknown
    ) => void;
  };
}
