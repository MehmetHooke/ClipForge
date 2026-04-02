import React, { createContext, useContext, useMemo, useState } from 'react';
import { GeneratedOutput } from '../types/output';
import { ProjectDraft } from '../types/project';

type ProjectContextType = {
  currentDraft: ProjectDraft | null;
  generatedOutputs: GeneratedOutput[];
  setCurrentDraft: (draft: ProjectDraft | null) => void;
  setGeneratedOutputs: (outputs: GeneratedOutput[]) => void;
  clearProjectState: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [currentDraft, setCurrentDraft] = useState<ProjectDraft | null>(null);
  const [generatedOutputs, setGeneratedOutputs] = useState<GeneratedOutput[]>([]);

  const clearProjectState = () => {
    setCurrentDraft(null);
    setGeneratedOutputs([]);
  };

  const value = useMemo(
    () => ({
      currentDraft,
      generatedOutputs,
      setCurrentDraft,
      setGeneratedOutputs,
      clearProjectState,
    }),
    [currentDraft, generatedOutputs]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProject must be used inside ProjectProvider');
  }

  return context;
}