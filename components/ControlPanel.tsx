
import React from 'react';
import type { AspectRatio, LightingStyle, CameraPerspective } from '../types';
import { ASPECT_RATIOS, LIGHTING_STYLES, CAMERA_PERSPECTIVES } from '../constants';

interface ControlPanelProps {
  aspectRatio: AspectRatio;
  setAspectRatio: (ar: AspectRatio) => void;
  lightingStyle: LightingStyle;
  setLightingStyle: (ls: LightingStyle) => void;
  cameraPerspective: CameraPerspective;
  setCameraPerspective: (cp: CameraPerspective) => void;
}

const SelectInput: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}> = ({ label, value, onChange, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-300">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
    >
      {children}
    </select>
  </div>
);

export default function ControlPanel({
  aspectRatio,
  setAspectRatio,
  lightingStyle,
  setLightingStyle,
  cameraPerspective,
  setCameraPerspective,
}: ControlPanelProps): React.ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SelectInput
        label="Aspect Ratio"
        value={aspectRatio.id}
        onChange={(e) => setAspectRatio(ASPECT_RATIOS.find(ar => ar.id === e.target.value) || ASPECT_RATIOS[0])}
      >
        {ASPECT_RATIOS.map((ar) => (
          <option key={ar.id} value={ar.id}>{ar.label}</option>
        ))}
      </SelectInput>

      <SelectInput
        label="Lighting Style"
        value={lightingStyle.id}
        onChange={(e) => setLightingStyle(LIGHTING_STYLES.find(ls => ls.id === e.target.value) || LIGHTING_STYLES[0])}
      >
        {LIGHTING_STYLES.map((ls) => (
          <option key={ls.id} value={ls.id}>{ls.label}</option>
        ))}
      </SelectInput>

      <SelectInput
        label="Camera Perspective"
        value={cameraPerspective.id}
        onChange={(e) => setCameraPerspective(CAMERA_PERSPECTIVES.find(cp => cp.id === e.target.value) || CAMERA_PERSPECTIVES[0])}
      >
        {CAMERA_PERSPECTIVES.map((cp) => (
          <option key={cp.id} value={cp.id}>{cp.label}</option>
        ))}
      </SelectInput>
    </div>
  );
}
