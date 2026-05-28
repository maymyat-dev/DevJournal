"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  max?: number;
}

const TagInput = ({ value, onChange, max = 5 }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();

      if (newTag && !value.includes(newTag) && value.length < max) {
        onChange([...value, newTag]);
      }

      setInputValue("");
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge
            key={tag}
            variant={"secondary"}
            className="flex items-center gap-1"
          >
            #{tag}
            <button type="button" onClick={() => removeTag(tag)}>
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div>
        {value.length < max && (
          <Input
            placeholder="Add tag and press enter"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default TagInput;
