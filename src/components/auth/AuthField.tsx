type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
};

export function AuthField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}: Props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="auth-input w-full px-3 py-2.5 text-sm"
      />
    </div>
  );
}
