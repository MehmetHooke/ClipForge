import { Platform } from 'react-native';
import WorkspaceScreenNative from './WorkspaceScreen.native';
import WorkspaceScreenWeb from './WorkspaceScreen.web';

export default function WorkspaceScreen() {
  if (Platform.OS === 'web') {
    return <WorkspaceScreenWeb />;
  }

  return <WorkspaceScreenNative />;
}