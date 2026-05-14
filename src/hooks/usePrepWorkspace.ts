import { useSyncExternalStore } from 'react';
import { getStoredPrepWorkspace, subscribePrepWorkspace, type PrepWorkspaceState } from '../lib/prep';

let cachedPrepWorkspace: PrepWorkspaceState | null = null;
let cachedPrepWorkspaceKey: string | null = null;

function getPrepWorkspaceSnapshot() {
  const snapshot = getStoredPrepWorkspace();
  const snapshotKey = JSON.stringify(snapshot);

  if (cachedPrepWorkspace && cachedPrepWorkspaceKey === snapshotKey) {
    return cachedPrepWorkspace;
  }

  cachedPrepWorkspace = snapshot;
  cachedPrepWorkspaceKey = snapshotKey;
  return snapshot;
}

export function usePrepWorkspace() {
  return useSyncExternalStore(subscribePrepWorkspace, getPrepWorkspaceSnapshot, getPrepWorkspaceSnapshot);
}