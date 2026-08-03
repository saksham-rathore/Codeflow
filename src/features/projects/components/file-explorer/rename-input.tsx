import { useState } from "react";

export const RenameInput = ({
    type,
    level,
    onSubmit,
    onCancel,
    isOpen,
    defaultValue,
}: {
    type: "file" | "folder",
    level: number,
    onSubmit: (name: string) => void;
    isOpen?: boolean;
    defaultValue: string;
    onCancel: () => void;
}) => {
    const [Value, setValue] = useState(defaultValue);

    const handleSubmit = () => {
        const trimmedValue = Value.trim() || defaultValue;
        onSubmit(trimmedValue);
    }
}