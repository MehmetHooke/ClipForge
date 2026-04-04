import React, { createContext, useContext, useMemo, useState } from 'react';
import type { GeneratedOutput, GenerateRequest } from '../types/generate';

type ProjectDraft = GenerateRequest;

type ProjectContextType = {
  currentDraft: ProjectDraft | null;
  generatedOutputs: GeneratedOutput[];
  setCurrentDraft: (draft: ProjectDraft | null) => void;
  setGeneratedOutputs: (outputs: GeneratedOutput[]) => void;
  addGeneratedOutput: (output: GeneratedOutput) => void;
  clearProjectState: () => void;
  latestOutput: GeneratedOutput | null;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [currentDraft, setCurrentDraft] = useState<ProjectDraft | null>(null);
  const [generatedOutputs, setGeneratedOutputs] = useState<GeneratedOutput[]>([]);

  const addGeneratedOutput = (output: GeneratedOutput) => {
    setGeneratedOutputs((prev) => [output, ...prev]);
  };

  const clearProjectState = () => {
    setCurrentDraft(null);
    setGeneratedOutputs([]);
  };

  const latestOutput = generatedOutputs.length > 0 ? generatedOutputs[0] : null;

  const value = useMemo(
    () => ({
      currentDraft,
      generatedOutputs,
      setCurrentDraft,
      setGeneratedOutputs,
      addGeneratedOutput,
      clearProjectState,
      latestOutput,
    }),
    [currentDraft, generatedOutputs, latestOutput]
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