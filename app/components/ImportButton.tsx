"use client";

import { Button } from "@nextui-org/react";
import React, { useCallback, useRef } from "react";
import { FaUpload } from "react-icons/fa";

interface IImportButton {
  onChange: (e: File | null) => void;
}

const ImportButton: React.FC<IImportButton> = ({ onChange }) => {
  const inputFileReference = useRef<HTMLInputElement>(null);

  const clearInputFile = () => {
    if (inputFileReference.current) {
      inputFileReference.current.value = "";
    }
  };

  const onButtonClick = useCallback(() => {
    if (inputFileReference.current) {
      inputFileReference.current.click();
    }
  }, []);

  const handleImport = useCallback(
    async (event_: React.ChangeEvent<HTMLInputElement>) => {
      const rawFile = event_.target.files && event_.target.files[0];
      onChange(rawFile);
    },
    [onChange]
  );

  return (
    <>
      <input
        type="file"
        name="file"
        // accept={accept}
        ref={inputFileReference}
        className="hidden"
        onChange={handleImport}
        data-testid="input-button-import"
      />
      <Button
        // isIconOnly
        color="primary"
        endContent={<FaUpload />}
        onPress={onButtonClick}
      >
        Upload Cover
      </Button>
    </>
  );
};

export default ImportButton;
