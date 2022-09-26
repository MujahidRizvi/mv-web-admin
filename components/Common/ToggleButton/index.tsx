
import Switch from "react-switch";
import { useState } from "react";

type ToggleButtonProps = {
  checked: boolean;
  onChange: any;
};

export default function ToggleButton({ checked, onChange }: ToggleButtonProps) {
  const [chked, setCheckState] = useState(checked);
  const onCheckChange = (val: any) => {
    setCheckState(val);
    onChange(val);
  };
  return (
    <>
      <Switch
        onChange={(val) => {
          onCheckChange(val);
        }}
        checked={chked}
      />
    </>
  );
}
