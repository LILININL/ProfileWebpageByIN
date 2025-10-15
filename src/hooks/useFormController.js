import { useState } from "react";

export function useFormController({
  initialValues,
  onSubmit,
  onSuccess,
  onError,
}) {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const updateField = (field, value) => {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));
    if (error) {
      setError("");
    }
  };

  const handleChange =
    (field) =>
    ({ target }) => {
      const value =
        target?.type === "checkbox"
          ? target.checked
          : target?.value ?? "";
      updateField(field, value);
    };

  const resetResult = () => setResult(null);

  const handleSubmit = async (event) => {
    event?.preventDefault?.();
    setLoading(true);
    setError("");
    resetResult();

    try {
      const payload = await onSubmit(values);
      setResult(payload ?? null);
      onSuccess?.(payload ?? null, values);
    } catch (err) {
      const message = err?.message || "เกิดข้อผิดพลาดไม่ทราบสาเหตุ";
      setError(message);
      onError?.(message, err);
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    loading,
    error,
    result,
    handleChange,
    handleSubmit,
    setValues,
    resetResult,
  };
}
