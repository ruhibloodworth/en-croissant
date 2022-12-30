import { Autocomplete } from "@mantine/core";
import { useState } from "react";
import { query_players, Sides } from "../utils/db";
import { ChessSidePicker } from "./ChessSidePicker";

export function SearchInput({
  label,
  file,
  value,
  sides,
  setSides,
  setValue,
}: {
  label: string;
  file: string;
  value: string;
  sides: Sides;
  setSides: (val: Sides) => void;
  setValue: (val: string) => void;
}) {
  const [tempValue, setTempValue] = useState(value);
  const [data, setData] = useState<string[]>([]);

  async function handleChange(val: string) {
    setTempValue(val);
    if (data.includes(val)) {
      setValue(val);
    }
    if (val.trim().length === 0) {
      setValue("");
    }
    setData([]);

    if (!(val.trim().length === 0)) {
      const res = await query_players(file, {
        limit: 5,
        offset: 0,
        name: val,
      });
      setData(res.map((game) => game.name));
    }
  }
  return (
    <Autocomplete
      value={tempValue}
      data={data}
      onChange={handleChange}
      rightSection={
        <ChessSidePicker sides={sides} setSides={setSides} label={label} />
      }
      label={label}
      placeholder="Player name"
    />
  );
}